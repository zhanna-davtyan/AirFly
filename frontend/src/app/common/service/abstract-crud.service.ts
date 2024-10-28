import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

export abstract class AbstractCrudService<DTO, SERVICE> {

  readonly ROOT_URL_WITH_SLASHES = '/api/';
  readonly URL_FOR_TYPE;

  readonly httpClient: HttpClient;
  readonly urlSnippetForTypeWithoutSlashes: string;

  protected constructor(httpClient: HttpClient, urlSnippetForTypeWithoutSlashes: string) {
    this.httpClient = httpClient;
    this.urlSnippetForTypeWithoutSlashes = urlSnippetForTypeWithoutSlashes;
    this.URL_FOR_TYPE = this.ROOT_URL_WITH_SLASHES + this.urlSnippetForTypeWithoutSlashes;
  }

  abstract jsonToDto(json: any): DTO;

  getAll(): Observable<DTO[]> {
    return this.httpClient
      .get<DTO[]>(this.URL_FOR_TYPE)
      .pipe(map((dtos: DTO[]) => dtos.map((json: any) => this.jsonToDto(json))));
  }

  getById(id: number): Observable<DTO>  {
    return this.httpClient
      .get(this.URL_FOR_TYPE + '/' + id)
      .pipe(map((json: any) => this.jsonToDto(json)));
  }

  insert(dto: DTO): Observable<DTO> {
    return this.httpClient
      .post(this.URL_FOR_TYPE + '/insert', dto)
      .pipe(map((json: any) => this.jsonToDto(json)));
  }

  update(id: number, dto: DTO): Observable<any> {
    return this.httpClient
      .put(this.URL_FOR_TYPE + '/update/' + id, dto);
  }

  delete(id: number): Observable<any> {
    return this.httpClient
      .delete(this.URL_FOR_TYPE + '/delete/' + id );
  }

}
