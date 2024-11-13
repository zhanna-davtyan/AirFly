import {Booking} from "../booking/booking.model";

export class Passenger {
  type: string;
  firstname: string;
  lastname: string;
  dateOfBirth: Date;

  constructor(
    type: string,
    firstname: string,
    lastname: string,
    dateOfBirth: Date,
  ) {
    this.type = type;
    this.firstname = firstname;
    this.lastname = lastname;
    this.dateOfBirth = dateOfBirth;
  }
}

