package com.airfly.backend.passenger;

import com.airfly.backend.booking.Booking;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "passengers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Passenger {

    public Passenger(String type, String firstname, String lastname, Timestamp dateOfBirth) {
        this.type = type;
        this.firstname = firstname;
        this.lastname = lastname;
        this.dateOfBirth = dateOfBirth;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "type")
    private String type;

    @Column(name = "first_name")
    private String firstname;

    @Column(name = "last_name")
    private String lastname;

    @Column(name = "date_of_birth")
    private Timestamp dateOfBirth;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;
}

