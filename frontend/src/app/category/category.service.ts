import {Injectable} from "@angular/core";
import {AbstractCrudService} from "../common/service/abstract-crud.service";
import {Category} from "./category.model";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class CategoryService extends AbstractCrudService<Category> {

  constructor(httpClient: HttpClient) {
    super(httpClient, "categories");
  }

  jsonToDto(json: any): Category {
    return new Category(
      json.id,
      json.name,
      json.price
    );
  }
}
