package com.airfly.backend.booking;

import com.airfly.backend.bookingflightmapping.BookingFlightMapping;
import com.airfly.backend.category.Category;
import com.airfly.backend.passenger.Passenger;
import com.airfly.backend.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    public Booking(
            User user,
            Double totalPrice,
            Boolean travelInsurance,
            String billingFirstname,
            String billingLastname,
            String billingPostcode,
            String billingCity,
            String billingStreet,
            String billingHousenumber,
            List<Passenger> passengers
    ){
        this.user = user;
        this.totalPrice = totalPrice;
        this.travelInsurance = travelInsurance;
        this.billingFirstname = billingFirstname;
        this.billingLastname = billingLastname;
        this.billingPostcode = billingPostcode;
        this.billingCity = billingCity;
        this.billingStreet = billingStreet;
        this.billingHousenumber = billingHousenumber;
        this.passengers = passengers;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "total_price")
    private Double totalPrice;

    @Column(name = "travel_insurance")
    private Boolean travelInsurance;

    @Column(name="billing_firstname")
    private String billingFirstname;

    @Column(name="billing_lastname")
    private String billingLastname;

    @Column(name="billing_postcode")
    private String billingPostcode;

    @Column(name="billing_city")
    private String billingCity;

    @Column(name="billing_street")
    private String billingStreet;

    @Column(name="billing_housenumber")
    private String billingHousenumber;

    @OneToMany(mappedBy = "booking")
    private List<Passenger> passengers;

    @OneToMany(mappedBy = "booking")
    private List<BookingFlightMapping> bookingFlightMappings;
}

