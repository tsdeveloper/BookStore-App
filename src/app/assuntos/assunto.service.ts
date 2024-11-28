import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Assunto } from '../shared/models/Assunto';
import { Pagination } from '../shared/models/Pagination';
import { AssuntoParams } from '../shared/models/AssuntoParams';

@Injectable({
  providedIn: 'root',
})
export class AssuntoService {
  baseUrl = environment.apiUrl;
  pagination?: Pagination<Assunto[]>;
  assuntoParams = new AssuntoParams();
  assuntoCache = new Map<string, Pagination<Assunto[]>>();

  constructor(private http: HttpClient) {}

  getAssuntos(useCache = true): Observable<Pagination<Assunto[]>> {
    if (!useCache) this.assuntoCache = new Map();

    if (this.assuntoCache.size > 0 && useCache) {
      if (this.assuntoCache.has(Object.values(this.assuntoParams).join('-'))) {
        this.pagination = this.assuntoCache.get(
          Object.values(this.assuntoParams).join('-')
        );
        if (this.pagination) return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.assuntoParams.codAs > 0)
      params = params.append('codAs', this.assuntoParams.codAs);

    params = params.append('sort', this.assuntoParams.sort);
    params = params.append('pageIndex', this.assuntoParams.pageNumber);
    params = params.append('pageSize', this.assuntoParams.pageSize);
    console.log(this.assuntoParams.sort);
    if (this.assuntoParams.search)
      params = params.append('search', this.assuntoParams.search);

    return this.http
      .get<Pagination<Assunto[]>>(`${this.baseUrl}/assunto/all`, { params })
      .pipe(
        map((response) => {
          this.assuntoCache.set(
            Object.values(this.assuntoParams).join('-'),
            response
          );
          this.pagination = response;
          return response;
        })
      );
  }

  create(values: any) {
    return this.http.post<Assunto>(`${this.baseUrl}/assunto`, values).pipe(
      map((assunto) => {
        return assunto;
      })
    );
  }

  update(value: Assunto) {
    return this.http.put(
      `${this.baseUrl}/assunto/editar/${value.codAs}`,
      value
    );
  }

  delete(value: number) {
    return this.http.delete(`${this.baseUrl}/assunto/remover/${value}`);
  }

  setAssuntoParams(params: AssuntoParams) {
    this.assuntoParams = params;
  }

  getAssuntoParams() {
    return this.assuntoParams;
  }

  getAssunto(id: number) {
    const assunto = [...this.assuntoCache.values()].reduce(
      (acc, paginatedResult) => {
        return { ...acc, ...paginatedResult.data.find((x) => x.codAs === id) };
      },
      {} as Assunto
    );

    if (Object.keys(assunto).length !== 0) return of(assunto);

    return this.http.get<Assunto>(`${this.baseUrl}/assunto/details/` + id);
  }
}
