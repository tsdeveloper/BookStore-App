import { AssuntoService } from './../../assuntos/assunto.service';
import { AutorService } from './../../autores/autor.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LivroService } from '../livro.service';
import { Livro } from 'src/app/shared/models/Livro';
import { Autor } from 'src/app/shared/models/Autor';
import { Assunto } from 'src/app/shared/models/Assunto';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.scss'],
})
export class LivroCreateComponent implements OnInit {
  errors: string[] | null = null;
  dropdownAutorList: Autor[] = [];
  dropdownAssuntoList: Assunto[] = [];
  dropdownAutorListSettings: any | null = null;
  dropdownAssuntoListSettings: any | null = null;
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private livroService: LivroService,
    private toastr: ToastrService,
    private autorService: AutorService,
    private assuntoService: AssuntoService
  ) {
    this.registerForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(40)]],
      editora: ['', [Validators.required, Validators.maxLength(40)]],
      edicao: [0, Validators.required],
      anoPublicacao: ['', [Validators.required, Validators.maxLength(4)]],
      autores: [[], [Validators.required]],
      assuntos: [[], [Validators.required]],
    });
  }

  ngOnInit() {
    this.getAutores();
    this.getAssuntos();
    this.dropdownAutorListSettings = {
      singleSelection: false,
      idField: 'codAu',
      textField: 'nome',
      selectAllText: 'Selecionar todos',
      unSelectAllText: 'limpar seleção',
    };

    this.dropdownAssuntoListSettings = {
      singleSelection: false,
      idField: 'codAs',
      textField: 'descricao',
      selectAllText: 'Selecionar todos',
      unSelectAllText: 'limpar seleção',
    };
  }

  getAutores(useCache: boolean = true) {
    this.autorService.getAutores(useCache).subscribe({
      next: (response) => {
        console.log(response.data);
        this.dropdownAutorList = response.data;
      },
      error: (error) => console.log(error),
    });
  }

  getAssuntos(useCache: boolean = true) {
    this.assuntoService.getAssuntos(useCache).subscribe({
      next: (response) => {
        console.log(response.data);
        this.dropdownAssuntoList = response.data;
      },
      error: (error) => console.log(error),
    });
  }

  onItemSelect($event: any) {
    console.log('$event is ', $event);
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.livroService.create(this.registerForm.value).subscribe({
      next: () => {
        this.toastr.success('Livros salvo com sucesso!');

        this.router.navigateByUrl('/livros');
      },
      error: (error) => {
        console.log(error.error.message);
        this.errors = [];
        this.errors.push(error.error.message);
        console.log(this.errors);
        this.toastr.error(this.errors.at(0));
      },
    });
  }
}
