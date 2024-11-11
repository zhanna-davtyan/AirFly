package com.airfly.backend.bookingflightmapping;

import com.airfly.backend.booking.Booking;
import com.airfly.backend.category.Category;
import com.airfly.backend.flight.Flight;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "booking_flight_mappings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingFlightMapping {

    public BookingFlightMapping(Booking booking, Flight flight, Category category, String type) {
        this.booking = booking;
        this.flight = flight;
        this.category = category;
        this.type = type;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    @JsonBackReference
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "flight_id")
    private Flight flight;

    @Column(name="type")
    private String type;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}

