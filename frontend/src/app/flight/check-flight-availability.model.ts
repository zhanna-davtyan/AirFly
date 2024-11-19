export class CheckFlightAvailability {

  flightId: number;
  numberOfPassengers: number;

  constructor(flightId: number, numberOfPassengers: number) {
    this.flightId = flightId;
    this.numberOfPassengers = numberOfPassengers;
  }
}
