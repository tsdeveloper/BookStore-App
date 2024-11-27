import { LivroService } from './../livros/livro.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Livro } from '../shared/models/Livro';
import { LivroParams } from '../shared/models/LivroParams';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.scss']
})
export class LivrosComponent implements OnInit {
  errors: string[] | null = null;
  @ViewChild('search') searchTerm?: ElementRef;
  livros: Livro[] = [];
  livroParams: LivroParams;
  sortOptions = [
    {name: 'Ordem crescente', value: 'asc'},
  ];
  totalCount = 0;
  @Input() useCache:boolean = true;
  message: string | null = null;
  progress: number | null = 0;

  constructor(private fb: FormBuilder, private router: Router,
    private livroService: LivroService, private toastr: ToastrService) {
      this.livroParams = livroService.getLivroParams();

    }

  ngOnInit() {
    console.log('List livros')
    this.useCache = false;
    this.getLivros(this.useCache);
  }

  onPageChanged(event: any) {
    const params = this.livroService.getLivroParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.livroService.setLivroParams(params);
      this.livroParams = params;
      this.getLivros();
    }
  }
  getLivros(useCache:boolean = true) {
    this.livroService.getLivros(useCache).subscribe({
      next: response => {
        this.livros = response.data;
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    })
  }

  onSearch() {
    const params = this.livroService.getLivroParams();
    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber = 1;
    this.livroService.setLivroParams(params);
    this.livroParams = params;
    this.getLivros();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.livroParams = new LivroParams();
    this.livroService.setLivroParams(this.livroParams);
    this.getLivros();
  }

  emitEvent(useCache:any) {
    this.useCache = useCache;
  }

  onDowloadReport() {
    this.livroService.getDownloadReport().subscribe((response) => {
      this.message = "response['message']";
  });
  }
}
