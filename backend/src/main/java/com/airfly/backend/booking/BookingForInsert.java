package com.airfly.backend.booking;


import com.airfly.backend.passenger.Passenger;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingForInsert {
    private boolean travelInsurance;
    private List<Passenger> passengers;
    private Long outwardFlightId;
    private Long outwardCategoryId;
    private Long returnFlightId;
    private Long returnCategoryId;
    private String billingFirstname;
    private String billingLastname;
    private String billingPostcode;
    private String billingCity;
    private String billingStreet;
    private String billingHousenumber;
}
