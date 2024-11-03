import {Booking} from "../booking/booking.model";

export class Passenger {
  id: number;
  type: string;
  firstname: string;
  lastname: string;
  dateOfBirth: Date;

  constructor(
    id: number,
    type: string,
    firstname: string,
    lastname: string,
    dateOfBirth: Date,
  ) {
    this.id = id;
    this.type = type;
    this.firstname = firstname;
    this.lastname = lastname;
    this.dateOfBirth = dateOfBirth;
  }
}

