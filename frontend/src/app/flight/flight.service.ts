import {AbstractCrudService} from "../common/service/abstract-crud.service";
import {Flight} from "./flight.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {FlightSearchByAirports} from "./flight-search-by-airports.model";

@Injectable({providedIn: 'root'})
export class FlightService extends AbstractCrudService<Flight> {

  constructor(httpClient: HttpClient) {
    super(httpClient, "flights");
  }

  getFlightsByAirports(flightSearchByAirports: FlightSearchByAirports): Observable<Flight[]> {
    return this.httpClient
      .post<Flight[]>(this.URL_FOR_TYPE + '/get-by-airport-ids', flightSearchByAirports)
      .pipe(map((dtos: Flight[]) => dtos.map((json: any) => this.jsonToDto(json))));
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
