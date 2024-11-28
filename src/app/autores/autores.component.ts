import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Autor } from '../shared/models/Autor';
import { AutorParams } from '../shared/models/AutorParams';
import { AutorService } from './autor.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.scss'],
})
export class AutoresComponent implements OnInit {
  errors: string[] | null = null;
  @ViewChild('search') searchTerm?: ElementRef;
  autores: Autor[] = [];
  autorParams: AutorParams;
  sortOptions = [{ name: 'Ordem crescente', value: 'asc' }];
  totalCount = 0;
  @Input() useCache: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private autorService: AutorService,
    private toastr: ToastrService
  ) {
    this.autorParams = autorService.getAutorParams();
  }

  ngOnInit() {
    this.useCache = false;
    this.getAutors(this.useCache);
  }

  onPageChanged(event: any) {
    const params = this.autorService.getAutorParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.autorService.setAutorParams(params);
      this.autorParams = params;
      this.getAutors();
    }
  }
  getAutors(useCache: boolean = true) {
    this.autorService.getAutores(useCache).subscribe({
      next: (response) => {
        this.autores = response.data;
        this.totalCount = response.count;
      },
      error: (error) => console.log(error),
    });
  }

  onSearch() {
    const params = this.autorService.getAutorParams();
    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber = 1;
    this.autorService.setAutorParams(params);
    this.autorParams = params;
    this.getAutors();
  }

  onReset(useCache: boolean = true) {
    console.log(`reset ${useCache}`);
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.autorParams = new AutorParams();
    this.autorService.setAutorParams(this.autorParams);
    this.getAutors(useCache);
  }

  emitEvent(useCache: any) {
    this.useCache = useCache;
  }

  onReload($emit: boolean) {
    this.onReset($emit);
  }
}
