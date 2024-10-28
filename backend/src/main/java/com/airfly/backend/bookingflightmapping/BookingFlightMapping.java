package com.airfly.backend.bookingflightmapping;

import com.airfly.backend.booking.Booking;
import com.airfly.backend.flight.Flight;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "booking_flight_mappings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingFlightMapping {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "flight_id")
    private Long flightId;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "flight_id")
    private Flight flight;
}

