import {Passenger} from "../passenger/passenger.model";
import {Category} from "../category/category.model";
import {User} from "../user/user.model";
import {BookingFlightMapping} from "../bookingflightmapping/booking-flight-mapping.model";

export class Booking {
  id: number;
  user: User;
  totalPrice: number;
  travelInsurance: boolean;
  category: Category;
  passengers: Passenger[];
  bookingFlightMappings: BookingFlightMapping[];

  constructor(
    id: number,
    user: User,
    totalPrice: number,
    travelInsurance: boolean,
    category: Category,
    passengers: Passenger[],
    bookingFlightMappings: BookingFlightMapping[]
  ) {
    this.id = id;
    this.user = user;
    this.totalPrice = totalPrice;
    this.travelInsurance = travelInsurance;
    this.category = category;
    this.passengers = passengers;
    this.bookingFlightMappings = bookingFlightMappings;
  }
}
