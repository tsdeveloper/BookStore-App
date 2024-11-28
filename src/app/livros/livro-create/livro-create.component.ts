import { LivroAutor } from './../../shared/models/LivroAutor';
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
import {
  BsDatepickerConfig,
  BsDatepickerViewMode,
} from 'ngx-bootstrap/datepicker';
import { LivroAssunto } from 'src/app/shared/models/LivroAssunto';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.scss'],
})
export class LivroCreateComponent implements OnInit {
  livro: Livro = new Livro();
  errors: string[] | null = null;
  dropdownAutorList: Autor[] = [];
  dropdownAssuntoList: Assunto[] = [];
  dropdownAutorListSettings: any | null = null;
  dropdownAssuntoListSettings: any | null = null;
  registerForm: FormGroup;

  datePickerValue: Date = new Date(2020, 7);
  minMode: BsDatepickerViewMode = 'year';

  bsConfig?: Partial<BsDatepickerConfig>;

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
      edicao: ['', Validators.required],
      anoPublicacao: [0, [Validators.required, Validators.maxLength(4)]],
      autores: [[], [Validators.required]],
      assuntos: [[], [Validators.required]],
    });
  }

  ngOnInit() {
    this.bsConfig = Object.assign({
      minMode: this.minMode,
      dateInputFormat: 'YYYY',
    });
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
        this.dropdownAutorList = response.data;
      },
      error: (error) => console.log(error),
    });
  }

  getAssuntos(useCache: boolean = true) {
    this.assuntoService.getAssuntos(useCache).subscribe({
      next: (response) => {
        this.dropdownAssuntoList = response.data;
      },
      error: (error) => console.log(error),
    });
  }

  onItemSelect($event: any) {
    // console.log('$event is ', $event);
  }

  onSubmit() {
    this.livro = this.registerForm.value;
    this.livro.autores = this.livro.autores.map(
      (val) =>
        ({
          codAu: val.codAu,
        } as LivroAutor)
    );

    this.livro.assuntos = this.livro.assuntos.map(
      (val) =>
        ({
          codAs: val.codAs,
        } as LivroAssunto)
    );
    console.log(this.livro);

    this.livroService.create(this.livro).subscribe({
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

  onValueChange($event: Date) {
    let currentYear = $event.getFullYear();
    this.registerForm.patchValue({ anoPublicacao: currentYear });
  }
}
