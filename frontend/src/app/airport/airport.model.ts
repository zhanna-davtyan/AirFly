import {Flight} from "../flight/flight.model";

export class Airport {
  id: number;
  name: string;
  country: string;
  city: string;
  code: string;

  constructor(
    id: number,
    name: string,
    country: string,
    city: string,
    code: string
  ) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.city = city;
    this.code = code;
  }
}
