import {AbstractCrudService} from "../common/service/abstract-crud.service";
import {Flight} from "./flight.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {FlightSearch} from "./flight-search.model";
import {FlightSearchWithDate} from "./flight-search-with-date.model";

@Injectable({providedIn: 'root'})
export class FlightService extends AbstractCrudService<Flight> {

  constructor(httpClient: HttpClient) {
    super(httpClient, "flights");
  }

  getByFlightSearch(flightSearch: FlightSearch): Observable<Flight[]> {
    return this.httpClient
      .post<Flight[]>(this.URL_FOR_TYPE + '/get-by-flight-search', flightSearch)
      .pipe(map((dtos: Flight[]) => dtos.map((json: any) => this.jsonToDto(json))));
  }

  getByFlightSearchWithDate(flightSearchWithDate: FlightSearchWithDate): Observable<Flight[]> {
    return this.httpClient
      .post<Flight[]>(this.URL_FOR_TYPE + '/get-by-flight-search-with-date', flightSearchWithDate)
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
