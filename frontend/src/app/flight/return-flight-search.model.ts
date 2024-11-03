export class ReturnFlightSearch {
  departureAirportId: number;
  arrivalAirportId: number;
  numberOfPassengers: number;
  minDepartureTime: Date;

  constructor(
    departureAirportId: number,
    arrivalAirportId: number,
    numberOfPassengers: number,
    minDepartureTime: Date
  ) {
    this.departureAirportId = departureAirportId;
    this.arrivalAirportId = arrivalAirportId;
    this.numberOfPassengers = numberOfPassengers;
    this.minDepartureTime = minDepartureTime;

  }
}
