import {Booking} from "../booking/booking.model";
import {Flight} from "../flight/flight.model";

export class BookingFlightMapping {
  id: number;
  booking: Booking;
  flight: Flight;

  constructor(id: number, booking: Booking, flight: Flight) {
    this.id = id;
    this.booking = booking;
    this.flight = flight;
  }
}
