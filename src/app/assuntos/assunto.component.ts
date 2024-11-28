import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Assunto } from '../shared/models/Assunto';
import { AssuntoService } from './assunto.service';
import { AssuntoParams } from '../shared/models/AssuntoParams';

@Component({
  selector: 'app-assunto',
  templateUrl: './assunto.component.html',
  styleUrls: ['./assunto.component.scss'],
})
export class AssuntoComponent implements OnInit {
  errors: string[] | null = null;
  @ViewChild('search') searchTerm?: ElementRef;
  assuntos: Assunto[] = [];
  assuntoParams: AssuntoParams;
  sortOptions = [{ name: 'Ordem crescente', value: 'asc' }];
  totalCount = 0;
  @Input() useCache: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private assuntoService: AssuntoService,
    private toastr: ToastrService
  ) {
    this.assuntoParams = assuntoService.getAssuntoParams();
  }

  ngOnInit() {
    console.log('List assuntos');
    this.useCache = false;
    this.getAssuntos(this.useCache);
  }

  onPageChanged(event: any) {
    const params = this.assuntoService.getAssuntoParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.assuntoService.setAssuntoParams(params);
      this.assuntoParams = params;
      this.getAssuntos();
    }
  }
  getAssuntos(useCache: boolean = true) {
    this.assuntoService.getAssuntos(useCache).subscribe({
      next: (response) => {
        this.assuntos = response.data;
        this.totalCount = response.count;
      },
      error: (error) => console.log(error),
    });
  }

  onSearch() {
    const params = this.assuntoService.getAssuntoParams();
    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber = 1;
    this.assuntoService.setAssuntoParams(params);
    this.assuntoParams = params;
    this.getAssuntos();
  }

  onReset(useCache: boolean = true) {
    console.log(`reset ${useCache}`);
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.assuntoParams = new AssuntoParams();
    this.assuntoService.setAssuntoParams(this.assuntoParams);
    this.getAssuntos(useCache);
  }

  emitEvent(useCache: any) {
    this.useCache = useCache;
  }
}
