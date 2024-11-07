export class FlightSearchWithDate {
  departureAirportId: number;
  arrivalAirportId: number;
  numberOfPassengers: number;
  departureTime: Date;

  constructor(
    departureAirportId: number,
    arrivalAirportId: number,
    numberOfPassengers: number,
    departureTime: Date
  ) {
    this.departureAirportId = departureAirportId;
    this.arrivalAirportId = arrivalAirportId;
    this.numberOfPassengers = numberOfPassengers;
    this.departureTime = departureTime;
  }
}
