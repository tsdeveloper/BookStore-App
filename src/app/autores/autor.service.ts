import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Autor } from '../shared/models/Autor';
import { Pagination } from '../shared/models/Pagination';
import { AutorParams } from '../shared/models/AutorParams';

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  baseUrl = environment.apiUrl;
  pagination?: Pagination<Autor[]>;
  autorParams = new AutorParams();
  autorCache = new Map<string, Pagination<Autor[]>>();

  constructor(private http: HttpClient) {}

  getAutores(useCache = true): Observable<Pagination<Autor[]>> {
    if (!useCache) this.autorCache = new Map();

    if (this.autorCache.size > 0 && useCache) {
      if (this.autorCache.has(Object.values(this.autorParams).join('-'))) {
        this.pagination = this.autorCache.get(
          Object.values(this.autorParams).join('-')
        );
        if (this.pagination) return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.autorParams.codAu > 0)
      params = params.append('codAu', this.autorParams.codAu);

    params = params.append('sort', this.autorParams.sort);
    params = params.append('pageIndex', this.autorParams.pageNumber);
    params = params.append('pageSize', this.autorParams.pageSize);
    console.log(this.autorParams.sort);
    if (this.autorParams.search)
      params = params.append('search', this.autorParams.search);

    return this.http
      .get<Pagination<Autor[]>>(`${this.baseUrl}/autor/all`, { params })
      .pipe(
        map((response) => {
          this.autorCache.set(
            Object.values(this.autorParams).join('-'),
            response
          );
          this.pagination = response;
          return response;
        })
      );
  }

  create(values: any) {
    return this.http.post<Autor>(`${this.baseUrl}/autor`, values).pipe(
      map((autor) => {
        return autor;
      })
    );
  }

  update(value: Autor) {
    return this.http.put(`${this.baseUrl}/autor/editar/${value.codAu}`, value);
  }
  delete(value: number) {
    return this.http.delete(`${this.baseUrl}/autor/remover/${value}`);
  }
  setAutorParams(params: AutorParams) {
    this.autorParams = params;
  }

  getAutorParams() {
    return this.autorParams;
  }

  getAutor(id: number) {
    const autor = [...this.autorCache.values()].reduce(
      (acc, paginatedResult) => {
        return { ...acc, ...paginatedResult.data.find((x) => x.codAu === id) };
      },
      {} as Autor
    );

    if (Object.keys(autor).length !== 0) return of(autor);

    return this.http.get<Autor>(`${this.baseUrl}/autor/details/` + id);
  }
}
