export class FlightForComparison {
  flightNumber: string;
  departureAirportId: number;
  arrivalAirportId: number;
  airplaneId: number;
  departureTime: Date;
  arrivalTime: Date;
  price: number;

  constructor(
    flightNumber: string,
    departureAirportId: number,
    arrivalAirportId: number,
    airplaneId: number,
    departureTime: Date,
    arrivalTime: Date,
    price: number,
  ) {
    this.flightNumber = flightNumber;
    this.departureAirportId = departureAirportId;
    this.arrivalAirportId = arrivalAirportId;
    this.airplaneId = airplaneId;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
    this.price = price;
  }
}
