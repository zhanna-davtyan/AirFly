package com.airfly.backend.flight;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public interface FlightRepository extends JpaRepository<Flight, Long> {

    Optional<Flight> findByFlightNumber(String flightNumber);

    Boolean existsById(long id);

    Boolean existsByFlightNumber(String flightNumber);

    @Query("""
        SELECT f FROM Flight f
        WHERE f.departureAirport.id = :departureAirportId
        AND f.arrivalAirport.id = :arrivalAirportId
        AND f.departureTime BETWEEN :startDate AND :endDate
        AND (f.airplane.capacity - f.bookedSeats) >= :numberOfSeats
    """)
    List<Flight> findFlightByFlightSearch(
            @Param("departureAirportId") long departureAirportId,
            @Param("arrivalAirportId") long arrivalAirportId,
            @Param("startDate") Timestamp startDate,
            @Param("endDate") Timestamp endDate,
            @Param("numberOfSeats") long numberOfSeats
    );

}
