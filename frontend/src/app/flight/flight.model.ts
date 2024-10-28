import {Airport} from "../airport/airport.model";
import {Airplane} from "../airplane/airplane.model";

export class Flight {
  id: number;
  flightNumber: string;
  departureTime: Date;
  arrivalTime: Date;
  price: number;
  departureAirport: Airport;
  arrivalAirport: Airport;
  airplane: Airplane;
  bookedSeats: number;

  constructor(
    id: number,
    flightNumber: string,
    departureTime: Date,
    arrivalTime: Date,
    price: number,
    departureAirport: Airport,
    arrivalAirport: Airport,
    airplane: Airplane,
    bookedSeats: number
  ) {
    this.id = id;
    this.flightNumber = flightNumber;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
    this.price = price;
    this.departureAirport = departureAirport;
    this.arrivalAirport = arrivalAirport;
    this.airplane = airplane;
    this.bookedSeats = bookedSeats;
  }
}
