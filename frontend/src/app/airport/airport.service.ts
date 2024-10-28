import {Injectable} from "@angular/core";
import {AbstractCrudService} from "../common/service/abstract-crud.service";
import {HttpClient} from "@angular/common/http";
import {Airport} from "./airport.model";

@Injectable({providedIn: 'root'})
export class AirportService extends AbstractCrudService<Airport> {

  constructor(httpClient: HttpClient) {
    super(httpClient, "airports");
  }

  jsonToDto(json: any): Airport {
    return new Airport(
      json.id,
      json.name,
      json.country,
      json.city,
      json.code
    );
  }

}
