package com.airfly.backend.email;

import com.airfly.backend.flight.Flight;
import com.airfly.backend.passenger.Passenger;

import java.util.List;

public class EmailData {
    private Long bookingId;
    private String firstname;
    private String lastname;
    private String email;
    private Flight outwardFlight;
    private Flight returnFlight;
    private List<Passenger> passengers;
    private double totalPrice;
    private String htmlContent;

    public EmailData() {}

    public EmailData(Long bookingId, String firstname, String lastname, String email,
                     Flight outwardFlight, Flight returnFlight, List<Passenger> passengers,
                     double totalPrice, String htmlContent) {
        this.bookingId = bookingId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.outwardFlight = outwardFlight;
        this.returnFlight = returnFlight;
        this.passengers = passengers;
        this.totalPrice = totalPrice;
        this.htmlContent = htmlContent;
    }
    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public Flight getOutwardFlight() {
        return outwardFlight;
    }

    public void setOutwardFlight(Flight outwardFlight) {
        this.outwardFlight = outwardFlight;
    }

    public Flight getReturnFlight() {
        return returnFlight;
    }

    public void setReturnFlight(Flight returnFlight) {
        this.returnFlight = returnFlight;
    }

    public List<Passenger> getPassengers() {
        return passengers;
    }

    public void setPassengers(List<Passenger> passengers) {
        this.passengers = passengers;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }


    public String getHtmlContent() {
        return htmlContent;
    }

    public void setHtmlContent(String htmlContent) {
        this.htmlContent = htmlContent;
    }
}