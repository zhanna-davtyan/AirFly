package com.airfly.backend.airplane;

import com.airfly.backend.flight.Flight;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "airplanes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Airplane {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "model")
    private String model;

    @Column(name = "capacity")
    private Long capacity;

    @OneToMany(mappedBy = "airplane")
    private List<Flight> flights;
}
