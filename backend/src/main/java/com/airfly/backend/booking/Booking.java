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

    @Id
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "total_price")
    private Double totalPrice;

    @Column(name = "travel_insurance")
    private Boolean travelInsurance;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "booking")
    private List<Passenger> passengers;

    @OneToMany(mappedBy = "booking")
    private List<BookingFlightMapping> bookingFlightMappings;
}

