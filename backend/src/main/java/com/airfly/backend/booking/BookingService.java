package com.airfly.backend.booking;


import com.airfly.backend.bookingflightmapping.BookingFlightMapping;
import com.airfly.backend.bookingflightmapping.BookingFlightMappingService;
import com.airfly.backend.category.Category;
import com.airfly.backend.category.CategoryService;
import com.airfly.backend.common.service.EntityNotFoundException;
import com.airfly.backend.common.service.EntityNotInsertedException;
import com.airfly.backend.common.service.UnauthorizedException;
import com.airfly.backend.flight.Flight;
import com.airfly.backend.flight.FlightService;
import com.airfly.backend.passenger.Passenger;
import com.airfly.backend.passenger.PassengerService;
import com.airfly.backend.user.User;
import com.airfly.backend.user.UserService;
import com.airfly.backend.email.EmailService;
import com.airfly.backend.email.EmailBuilder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;


@Service
public class BookingService {

    private final PassengerService passengerService;
    private final FlightService flightService;
    private final BookingRepository bookingRepository;
    private final UserService userService;
    private final EmailService emailService;
    private final EmailBuilder bookingEmailBuilder;
    private final CategoryService categoryService;
    private final BookingFlightMappingService bookingFlightMappingService;

    public BookingService(PassengerService passengerService, FlightService flightService, BookingRepository bookingRepository, UserService userService, CategoryService categoryService, BookingFlightMappingService bookingFlightMappingService, EmailService emailService, EmailBuilder bookingEmailBuilder ) {
        this.passengerService = passengerService;
        this.flightService = flightService;
        this.bookingRepository = bookingRepository;
        this.userService = userService;
        this.categoryService = categoryService;
        this.bookingFlightMappingService = bookingFlightMappingService;
        this.emailService = emailService;
        this.bookingEmailBuilder = bookingEmailBuilder;
    }

    Long submitOrder(BookingForInsert bookingForInsert){
        try {
            passengerService.checkPassengerValidity(bookingForInsert.getPassengers());
            int numberOfPassengersWithoutBabies = 0;
            for (Passenger passenger : bookingForInsert.getPassengers()) {
                if (passenger.getType().equals("adult") || passenger.getType().equals("child")) {
                    numberOfPassengersWithoutBabies++;
                }
            }
            flightService.checkFlightAvailability(bookingForInsert.getOutwardFlightId(), numberOfPassengersWithoutBabies);
            Flight outwardFlight = flightService.getById(bookingForInsert.getOutwardFlightId());
            outwardFlight.setBookedSeats(outwardFlight.getBookedSeats() + numberOfPassengersWithoutBabies);
            Flight returnFlight = null;
            if (bookingForInsert.getReturnFlightId() != null) {
                flightService.checkFlightAvailability(bookingForInsert.getReturnFlightId(), numberOfPassengersWithoutBabies);
                returnFlight = flightService.getById(bookingForInsert.getReturnFlightId());
                returnFlight.setBookedSeats(returnFlight.getBookedSeats() + numberOfPassengersWithoutBabies);
            }
            Booking booking = new Booking(
                    userService.getCurrentUser(),
                    calculateTotalPrice(bookingForInsert, numberOfPassengersWithoutBabies),
                    bookingForInsert.isTravelInsurance(),
                    bookingForInsert.getBillingFirstname(),
                    bookingForInsert.getBillingLastname(),
                    bookingForInsert.getBillingPostcode(),
                    bookingForInsert.getBillingCity(),
                    bookingForInsert.getBillingStreet(),
                    bookingForInsert.getBillingHousenumber(),
                    bookingForInsert.getPassengers()
            );
            Booking insertedBooking = insert(booking);
            booking.getPassengers().forEach(
                    passenger -> passenger.setBooking(insertedBooking)
            );
            passengerService.insert(booking.getPassengers());
            BookingFlightMapping outwardBookingFlightMapping = new BookingFlightMapping(
                    booking,
                    flightService.getById(bookingForInsert.getOutwardFlightId()),
                    categoryService.getById(bookingForInsert.getOutwardCategoryId()),
                    "outgoing"
            );
            bookingFlightMappingService.insert(outwardBookingFlightMapping);
            if (bookingForInsert.getReturnFlightId() != null) {
                BookingFlightMapping returnBookingFlightMapping = new BookingFlightMapping(
                        booking,
                        flightService.getById(bookingForInsert.getReturnFlightId()),
                        categoryService.getById(bookingForInsert.getReturnCategoryId()),
                        "return"
                );
                bookingFlightMappingService.insert(returnBookingFlightMapping);
            }
            String recipientEmail = userService.getCurrentUser().getEmail();
            String subject = "Ihre Buchung bei AirFly";
            String htmlContent = bookingEmailBuilder.buildBookingConfirmationEmail(
                    insertedBooking,
                    outwardFlight,
                    returnFlight,
                    calculateTotalPrice(bookingForInsert, numberOfPassengersWithoutBabies)
            );
            emailService.sendEmail(recipientEmail, subject, htmlContent);
            return insertedBooking.getId();
        } catch (Exception e){
            throw new EntityNotInsertedException("Could not insert booking", e);
        }
    }

    public Booking insert(final Booking booking) {
        try {
            return bookingRepository.save(booking);
        } catch (Exception e) {
            throw new EntityNotInsertedException("Could not insert booking", e);
        }
    }

    Double calculateTotalPrice(BookingForInsert bookingForInsert, int numberOfPassengersWithoutBabies){
        Flight outwardFlight = flightService.getById(bookingForInsert.getOutwardFlightId());
        Category outwardFlightCategory = categoryService.getById(bookingForInsert.getOutwardCategoryId());
        BigDecimal outwardTotal = (outwardFlight.getPrice().add(outwardFlightCategory.getPrice())).multiply(new BigDecimal(numberOfPassengersWithoutBabies));
        if(bookingForInsert.getReturnFlightId() != null){
            Flight returnFlight = flightService.getById(bookingForInsert.getReturnFlightId());
            Category returnFlightCategory = categoryService.getById(bookingForInsert.getReturnCategoryId());
            BigDecimal returnTotal = (returnFlight.getPrice().add(returnFlightCategory.getPrice())).multiply(new BigDecimal(numberOfPassengersWithoutBabies));
            if(bookingForInsert.isTravelInsurance()){
                returnTotal = returnTotal.add(new BigDecimal(50));
            }
            return (outwardTotal.add(returnTotal).doubleValue());
        }
        if(bookingForInsert.isTravelInsurance()){
            outwardTotal = outwardTotal.add(new BigDecimal(50));
        }
        return (outwardTotal.doubleValue());
    }

    Booking getById(long id){
        User user = userService.getCurrentUser();
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Booking with id " + id + " not found"));
        if(user.getRole().equals("ADMIN") || booking.getUser().getId().equals(user.getId())){
            return booking;
        }
        throw new UnauthorizedException("User not permitted to retrieve booking");
    }

    List<Booking> getAllByUser(){
        User user = userService.getCurrentUser();
        return bookingRepository.findAllByUser(user);
    }

    List<Booking> getAll(){
        return bookingRepository.findAll();
    }
}
