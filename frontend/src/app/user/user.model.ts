import {Booking} from "../booking/booking.model";

export class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  bookings: Booking[];

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: string,
    bookings: Booking[]
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.role = role;
    this.bookings = bookings;
  }
}
