import {Injectable} from "@angular/core";
import {AbstractCrudService} from "../common/service/abstract-crud.service";
import {Booking} from "./booking.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BookingForInsert} from "./booking-for-insert.model";


@Injectable({providedIn: 'root'})
export class BookingService extends AbstractCrudService<Booking> {

  constructor(httpClient: HttpClient) {
    super(httpClient, "bookings");
  }

  submitOrder(bookingForInsert: BookingForInsert): Observable<BookingForInsert> {
    return this.httpClient
      .post<BookingForInsert>(this.URL_FOR_TYPE + '/submit-order', bookingForInsert);
  }


  jsonToDto(json: any): Booking {
    return new Booking(
      json.id,
      json.totalPrice,
      json.travelInsurance,
      json.category,
      json.passengers,
      json.bookingFlightMappings,
      json.billingFirstname,
      json.billingLastname,
      json.billingPostcode,
      json.billingCity,
      json.billingStreet,
      json.billingHousenumber
    )
  }

}
