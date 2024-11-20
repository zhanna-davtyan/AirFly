package com.airfly.backend.email;
import com.airfly.backend.booking.Booking;
import com.airfly.backend.flight.Flight;
import com.airfly.backend.passenger.Passenger;
import org.springframework.stereotype.Component;

@Component
public class EmailBuilder {
    public String buildBookingConfirmationEmail(Booking booking, Flight outwardFlight, Flight returnFlight, double totalPrice) {
        StringBuilder htmlContent = new StringBuilder();

        htmlContent.append("<h1>Vielen Dank für Ihre Buchung!</h1>")
                .append("<p>Hier sind Ihre Buchungsdetails:</p>")
                .append("<h2>Buchungsnummer: #AF").append(booking.getId()).append("</h2>")
                .append("<h3>Fluginformationen</h3>")
                .append("<ul>")
                .append("<li><strong>Abflug-Flugnummer:</strong> ").append(outwardFlight.getFlightNumber()).append("</li>")
                .append("<li><strong>Abflug-Datum:</strong> ").append(outwardFlight.getDepartureTime()).append("</li>")
                .append("<li><strong>Abflug-Ort:</strong> ").append(outwardFlight.getDepartureAirport().getName()).append("</li>")
                .append("<li><strong>Ankunft-Ort:</strong> ").append(outwardFlight.getArrivalAirport().getName()).append("</li>");

        if (returnFlight != null) {
            htmlContent.append("<li><strong>Rückflug-Flugnummer:</strong> ").append(returnFlight.getFlightNumber()).append("</li>")
                    .append("<li><strong>Rückflug-Datum:</strong> ").append(returnFlight.getDepartureTime()).append("</li>")
                    .append("<li><strong>Rückflug-Abflug-Ort:</strong> ").append(returnFlight.getDepartureAirport().getName()).append("</li>")
                    .append("<li><strong>Rückflug-Ankunft-Ort:</strong> ").append(returnFlight.getArrivalAirport().getName()).append("</li>");
        } else {
            htmlContent.append("<li><strong>Rückflug:</strong> Kein Rückflug gebucht.</li>");
        }

        htmlContent.append("</ul>")
                .append("<h3>Preis</h3>")
                .append("<p>Gesamtpreis: <strong>").append(totalPrice).append(" €</strong></p>")
                .append("<h3>Reisende</h3>")
                .append("<ul>");

        for (Passenger passenger : booking.getPassengers()) {
            htmlContent.append("<li>").append(passenger.getFirstname()).append(" ").append(passenger.getLastname())
                    .append(" (").append(passenger.getType()).append(")</li>");
        }

        htmlContent.append("</ul>")
                .append("<p>Wir wünschen Ihnen eine gute Reise!</p>")
                .append("<p>Mit freundlichen Grüßen,<br>Ihr AirFly-Team</p>");

        return htmlContent.toString();
    }
}

