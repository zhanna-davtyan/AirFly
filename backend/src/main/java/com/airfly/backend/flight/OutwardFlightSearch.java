package com.airfly.backend.flight;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OutwardFlightSearch {
    long departureAirportId;
    long arrivalAirportId;
    long numberOfPassengers;
}
