import {Booking} from "../booking/booking.model";
import {Flight} from "../flight/flight.model";
import {Category} from "../category/category.model";

export class BookingFlightMapping {
  id: number;
  booking: Booking;
  flight: Flight;
  category: Category;
  type: string;

  constructor(id: number, booking: Booking, flight: Flight, category: Category, type: string) {
    this.id = id;
    this.booking = booking;
    this.flight = flight;
    this.category = category;
    this.type = type;
  }
}
