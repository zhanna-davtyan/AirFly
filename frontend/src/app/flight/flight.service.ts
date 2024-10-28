import {AbstractCrudService} from "../common/service/abstract-crud.service";
import {Flight} from "./flight.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class FlightService extends AbstractCrudService<Flight> {

  constructor(httpClient: HttpClient) {
    super(httpClient, "flights");
  }

  jsonToDto(json: any): Flight {
    return new Flight(
      json.id,
      json.flightNumber,
      json.departureTime,
      json.arrivalTime,
      json.price,
      json.departureAirport,
      json.arrivalAirport,
      json.airplane,
      json.bookedSeats
    );
  }

}
