export class FlightSearch {
  departureAirportId: number;
  arrivalAirportId: number;
  numberOfPassengers: number;

  constructor(
    departureAirportId: number,
    arrivalAirportId: number,
    numberOfPassengers: number
  ) {
    this.departureAirportId = departureAirportId;
    this.arrivalAirportId = arrivalAirportId;
    this.numberOfPassengers = numberOfPassengers;
  }
}
