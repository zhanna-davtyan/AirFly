import {Booking} from "../booking/booking.model";
import {Flight} from "../flight/flight.model";
import {Category} from "../category/category.model";

export class BookingFlightMapping {
  id: number;
  booking: Booking;
  flight: Flight;
  category: Category

  constructor(id: number, booking: Booking, flight: Flight, category: Category) {
    this.id = id;
    this.booking = booking;
    this.flight = flight;
    this.category = category;
  }
}
