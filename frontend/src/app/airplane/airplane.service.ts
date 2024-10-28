import {Injectable} from "@angular/core";
import {AbstractCrudService} from "../common/service/abstract-crud.service";
import {HttpClient} from "@angular/common/http";
import {Airplane} from "./airplane.model";

@Injectable({providedIn: 'root'})
export class AirplaneService extends AbstractCrudService<Airplane> {

  constructor(httpClient: HttpClient) {
    super(httpClient, "airplanes");
  }

  jsonToDto(json: any): Airplane {
    return new Airplane(
      json.id,
      json.model,
      json.capacity
    );
  }

}
