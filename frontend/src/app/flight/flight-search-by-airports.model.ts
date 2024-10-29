export class FlightSearchByAirports {
  departureAirportId: number;
  arrivalAirportId: number;

  constructor(
    departureAirportId: number,
    arrivalAirportId: number
  ) {
    this.departureAirportId = departureAirportId;
    this.arrivalAirportId = arrivalAirportId;
  }
}
