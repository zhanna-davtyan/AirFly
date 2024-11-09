package com.airfly.backend.booking;


import com.airfly.backend.bookingflightmapping.BookingFlightMapping;
import com.airfly.backend.bookingflightmapping.BookingFlightMappingService;
import com.airfly.backend.category.Category;
import com.airfly.backend.category.CategoryService;
import com.airfly.backend.common.service.EntityNotInsertedException;
import com.airfly.backend.flight.Flight;
import com.airfly.backend.flight.FlightService;
import com.airfly.backend.passenger.PassengerService;
import com.airfly.backend.user.UserService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;


@Service
public class BookingService {

    private final PassengerService passengerService;
    private final FlightService flightService;
    private final BookingRepository bookingRepository;
    private final UserService userService;
    private final CategoryService categoryService;
    private final BookingFlightMappingService bookingFlightMappingService;

    public BookingService(PassengerService passengerService, FlightService flightService, BookingRepository bookingRepository, UserService userService, CategoryService categoryService, BookingFlightMappingService bookingFlightMappingService) {
        this.passengerService = passengerService;
        this.flightService = flightService;
        this.bookingRepository = bookingRepository;
        this.userService = userService;
        this.categoryService = categoryService;
        this.bookingFlightMappingService = bookingFlightMappingService;
    }

    Long submitOrder(BookingForInsert bookingForInsert){
        try {
            passengerService.checkPassengerValidity(bookingForInsert.getPassengers());
            flightService.checkFlightAvailability(bookingForInsert.getOutwardFlightId(), bookingForInsert.getPassengers().size());
            if(bookingForInsert.getReturnFlightId() != null){
                flightService.checkFlightAvailability(bookingForInsert.getReturnFlightId(), bookingForInsert.getPassengers().size());
            }
            Booking booking = new Booking(
                    userService.getCurrentUser(),
                    calculateTotalPrice(bookingForInsert),
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
                    passenger -> {
                        passenger.setBooking(insertedBooking);
                    }
            );
            passengerService.insert(booking.getPassengers());
            BookingFlightMapping outwardBookingFlightMapping = new BookingFlightMapping(
                    booking,
                    flightService.getById(bookingForInsert.getOutwardFlightId()),
                    categoryService.getById(bookingForInsert.getOutwardCategoryId())
                    );
            bookingFlightMappingService.insert(outwardBookingFlightMapping);
            if(bookingForInsert.getReturnFlightId() != null){
                BookingFlightMapping returnBookingFlightMapping = new BookingFlightMapping(
                        booking,
                        flightService.getById(bookingForInsert.getReturnFlightId()),
                        categoryService.getById(bookingForInsert.getReturnCategoryId())
                );
                bookingFlightMappingService.insert(returnBookingFlightMapping);
            }
            return insertedBooking.getId();
        }catch (Exception e){
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

    Double calculateTotalPrice(BookingForInsert bookingForInsert){
        Flight outwardFlight = flightService.getById(bookingForInsert.getOutwardFlightId());
        Category outwardFlightCategory = categoryService.getById(bookingForInsert.getOutwardCategoryId());
        BigDecimal outwardTotal = (outwardFlight.getPrice().add(outwardFlightCategory.getPrice())).multiply(new BigDecimal(bookingForInsert.getPassengers().size()));
        if(bookingForInsert.getReturnFlightId() != null){
            Flight returnFlight = flightService.getById(bookingForInsert.getReturnFlightId());
            Category returnFlightCategory = categoryService.getById(bookingForInsert.getReturnCategoryId());
            BigDecimal returnTotal = (returnFlight.getPrice().add(returnFlightCategory.getPrice())).multiply(new BigDecimal(bookingForInsert.getPassengers().size()));
            return (outwardTotal.add(returnTotal).doubleValue());
        }
        return (outwardTotal.doubleValue());
    }
}
