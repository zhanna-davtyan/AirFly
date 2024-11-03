package com.airfly.backend.flight;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReturnFlightSearch {
    long departureAirportId;
    long arrivalAirportId;
    long numberOfPassengers;
    Timestamp minDepartureTime;
}
