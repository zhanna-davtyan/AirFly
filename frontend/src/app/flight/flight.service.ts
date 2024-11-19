import {AbstractCrudService} from "../common/service/abstract-crud.service";
import {Flight} from "./flight.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {OutwardFlightSearch} from "./outward-flight-search.model";
import {FlightSearchWithDate} from "./flight-search-with-date.model";
import {ReturnFlightSearch} from "./return-flight-search.model";
import {CheckFlightAvailability} from "./check-flight-availability.model";

@Injectable({providedIn: 'root'})
export class FlightService extends AbstractCrudService<Flight> {

  constructor(httpClient: HttpClient) {
    super(httpClient, "flights");
  }

  getByOutwardFlightSearch(flightSearch: OutwardFlightSearch): Observable<Flight[]> {
    return this.httpClient
      .post<Flight[]>(this.URL_FOR_TYPE + '/get-by-outward-flight-search', flightSearch)
      .pipe(map((dtos: Flight[]) => dtos.map((json: any) => this.jsonToDto(json))));
  }

  checkFlightAvailability(checkFlightAvailability: CheckFlightAvailability): Observable<Boolean> {
    return this.httpClient
      .post<Boolean>(this.URL_FOR_TYPE + '/check-availability', checkFlightAvailability)
  }

  getByReturnFlightSearch(flightSearch: ReturnFlightSearch): Observable<Flight[]> {
    return this.httpClient
      .post<Flight[]>(this.URL_FOR_TYPE + '/get-by-return-flight-search', flightSearch)
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
