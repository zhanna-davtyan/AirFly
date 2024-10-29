package com.airfly.backend.flight;

import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public interface FlightRepository extends JpaRepository<Flight, Long> {

    Optional<Flight> findByFlightNumber(String flightNumber);

    Boolean existsById(long id);

    Boolean existsByFlightNumber(String flightNumber);

    List<Flight> findByDepartureAirportIdAndArrivalAirportIdAndDepartureTimeBetween(
            long departureAirportId,
            long arrivalAirportId,
            Timestamp startDate,
            Timestamp endDate
    );}
