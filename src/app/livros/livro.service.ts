import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Livro } from '../shared/models/Livro';
import { map, Observable, of } from 'rxjs';
import { LivroParams } from '../shared/models/LivroParams';
import { Pagination } from '../shared/models/Pagination';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl = environment.apiUrl;
  pagination?: Pagination<Livro[]>;
  livroParams = new LivroParams();
  livroCache = new Map<string, Pagination<Livro[]>>()

  constructor(private http: HttpClient) { }

  getLivros(useCache = true): Observable<Pagination<Livro[]>> {

    if (!useCache) this.livroCache = new Map();

    if (this.livroCache.size > 0 && useCache) {
      if (this.livroCache.has(Object.values(this.livroParams).join('-'))) {
        this.pagination = this.livroCache.get(Object.values(this.livroParams).join('-'));
        if(this.pagination) return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.livroParams.codI > 0) params = params.append('codI', this.livroParams.codI);
    if (this.livroParams.edicao > 0) params = params.append('edicao', this.livroParams.edicao);
    if (this.livroParams.editora) params = params.append('editora', this.livroParams.editora);
    if (this.livroParams.anoPublicacao) params = params.append('anoPublicacao', this.livroParams.anoPublicacao);

    params = params.append('sort', this.livroParams.sort);
    params = params.append('pageIndex', this.livroParams.pageNumber);
    params = params.append('pageSize', this.livroParams.pageSize);
    console.log(this.livroParams.sort)
    if (this.livroParams.search) params = params.append('search', this.livroParams.search);

    return this.http.get<Pagination<Livro[]>>(this.baseUrl + 'livro/all', {params}).pipe(
      map(response => {
        this.livroCache.set(Object.values(this.livroParams).join('-'), response)
        this.pagination = response;
        return response;
      })
    )
  }

  create(values: any) {
    return this.http.post<Livro>(this.baseUrl + 'livro', values).pipe(
      map(livro => {
        return livro;
      })
    )
  }

  update(value: Livro) {
    return this.http.put(this.baseUrl + `livro/editar/${value.codI}`, value);
  }

  setLivroParams(params: LivroParams) {
    this.livroParams = params;
  }

  getLivroParams(){
    return this.livroParams;
  }

  getLivro(id: number) {
    const livro = [...this.livroCache.values()]
      .reduce((acc, paginatedResult) => {
        return {...acc, ...paginatedResult.data.find(x => x.codI === id)}
      }, {} as Livro)

    if (Object.keys(livro).length !== 0) return of(livro);

    return this.http.get<Livro>(this.baseUrl + 'livro/details/' + id);
  }

  getDownloadReport() {
    return this.http.get(`${this.baseUrl}/livro/gerar-pdf`, {
      reportProgress: true,
      responseType: 'blob',
  });
  }
}
