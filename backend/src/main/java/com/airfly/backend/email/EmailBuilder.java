package com.airfly.backend.email;
import com.airfly.backend.booking.Booking;
import com.airfly.backend.flight.Flight;
import com.airfly.backend.passenger.Passenger;
import org.springframework.stereotype.Component;

@Component
public class EmailBuilder {
    public String buildBookingConfirmationEmail(Booking booking, Flight outwardFlight, Flight returnFlight, double totalPrice) {
        StringBuilder htmlContent = new StringBuilder();

        htmlContent.append("<h1>Thank you for your order!</h1>")
                .append("<p>Here are your booking details:</p>")
                .append("<h2>Booking number: #AF").append(booking.getId()).append("</h2>")
                .append("<h3>Outgoing flight</h3>")
                .append("<ul>")
                .append("<li><strong>Flight number:</strong> ").append(outwardFlight.getFlightNumber()).append("</li>")
                .append("<li><strong>Date:</strong> ").append(outwardFlight.getDepartureTime()).append("</li>")
                .append("<li><strong>Departure destination:</strong> ").append(outwardFlight.getDepartureAirport().getName()).append("</li>")
                .append("<li><strong>Arrival destination:</strong> ").append(outwardFlight.getArrivalAirport().getName()).append("</li>")
                .append("</ul>");

        if (returnFlight != null) {
            htmlContent
                    .append("<h3>Return flight</h3>")
                    .append("<ul>")
                    .append("<li><strong>Flight number:</strong> ").append(returnFlight.getFlightNumber()).append("</li>")
                    .append("<li><strong>Date:</strong> ").append(returnFlight.getDepartureTime()).append("</li>")
                    .append("<li><strong>Departure destination:</strong> ").append(returnFlight.getDepartureAirport().getName()).append("</li>")
                    .append("<li><strong>Arrival destination:</strong> ").append(returnFlight.getArrivalAirport().getName()).append("</li>")
                    .append("</ul>");
        } else {
            htmlContent
                    .append("<h3>Return flight</h3>")
                    .append("<ul>")
                    .append("<li><strong>Return flight:</strong> No return flight booked.</li>")
                    .append("</ul>");
        }

        htmlContent
                .append("<h3>Price</h3>")
                .append("<p>Total: <strong>").append(totalPrice).append(" €</strong></p>")
                .append("<h3>Passengers</h3>")
                .append("<ul>");

        for (Passenger passenger : booking.getPassengers()) {
            htmlContent.append("<li>").append(passenger.getFirstname()).append(" ").append(passenger.getLastname())
                    .append(" (").append(passenger.getType()).append(")</li>");
        }

        htmlContent.append("</ul>")
                .append("<p>We wish you a pleasant journey.</p>")
                .append("<p>Best regards,<br>Your AirFly-Team</p>");

        return htmlContent.toString();
    }
}

