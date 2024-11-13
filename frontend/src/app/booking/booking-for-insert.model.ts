import {Passenger} from "../passenger/passenger.model";

export class BookingForInsert {
  travelInsurance: boolean;
  passengers: Passenger[];
  outwardFlightId: number;
  outwardCategoryId: number;
  returnFlightId: number | null;
  returnCategoryId: number | null;
  billingFirstname: string;
  billingLastname: string;
  billingPostcode: string;
  billingCity: string;
  billingStreet: string;
  billingHousenumber: string;

  constructor(
    travelInsurance: boolean,
    passengers: Passenger[],
    outwardFlightId: number,
    outwardCategoryId: number,
    returnFlightId: number | null,
    returnCategoryId: number | null,
    billingFirstname: string,
    billingLastname: string,
    billingPostcode: string,
    billingCity: string,
    billingStreet: string,
    billingHousenumber: string
  ) {
    this.travelInsurance = travelInsurance;
    this.passengers = passengers;
    this.outwardCategoryId = outwardCategoryId;
    this.outwardFlightId = outwardFlightId;
    this.returnFlightId = returnFlightId;
    this.returnCategoryId = returnCategoryId
    this.billingFirstname = billingFirstname;
    this.billingLastname = billingLastname;
    this.billingPostcode = billingPostcode;
    this.billingCity = billingCity;
    this.billingStreet = billingStreet;
    this.billingHousenumber = billingHousenumber;
  }
}
