import {Passenger} from "../passenger/passenger.model";
import {Category} from "../category/category.model";
import {BookingFlightMapping} from "../bookingflightmapping/booking-flight-mapping.model";

export class Booking {
  id: number;
  totalPrice: number;
  travelInsurance: boolean;
  category: Category;
  passengers: Passenger[];
  bookingFlightMappings: BookingFlightMapping[];
  billingFirstname: string;
  billingLastname: string;
  billingPostcode: string;
  billingCity: string;
  billingStreet: string;
  billingHousenumber: string;

  constructor(
    id: number,
    totalPrice: number,
    travelInsurance: boolean,
    category: Category,
    passengers: Passenger[],
    bookingFlightMappings: BookingFlightMapping[],
    billingFirstname: string,
    billingLastname: string,
    billingPostcode: string,
    billingCity: string,
    billingStreet: string,
    billingHousenumber: string
  ) {
    this.id = id;
    this.totalPrice = totalPrice;
    this.travelInsurance = travelInsurance;
    this.category = category;
    this.passengers = passengers;
    this.bookingFlightMappings = bookingFlightMappings;
    this.billingFirstname = billingFirstname;
    this.billingLastname = billingLastname;
    this.billingPostcode = billingPostcode;
    this.billingCity = billingCity;
    this.billingStreet = billingStreet;
    this.billingHousenumber = billingHousenumber;
  }
}
