import { LivroAutor } from './../../shared/models/LivroAutor';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LivroService } from '../livro.service';
import { Livro } from 'src/app/shared/models/Livro';
import { AutorService } from 'src/app/autores/autor.service';
import { AssuntoService } from 'src/app/assuntos/assunto.service';
import { Assunto } from 'src/app/shared/models/Assunto';
import { Autor } from 'src/app/shared/models/Autor';
import {
  BsDatepickerConfig,
  BsDatepickerViewMode,
} from 'ngx-bootstrap/datepicker';
import { LivroAssunto } from 'src/app/shared/models/LivroAssunto';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.scss'],
})
export class LivroUpdateComponent implements OnInit {
  errors: string[] | null = null;
  livro: Livro = new Livro();
  @Output() useCache = new EventEmitter();
  dropdownAutorList: Autor[] = [];
  dropdownAssuntoList: Assunto[] = [];
  dropdownAutorListSettings: any | null = null;
  dropdownAssuntoListSettings: any | null = null;
  registerForm: FormGroup;
  datePickerValue: Date = new Date(2020, 7);
  minMode: BsDatepickerViewMode = 'year';
  bsConfig?: Partial<BsDatepickerConfig>;
  livroId: any | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private livroService: LivroService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private autorService: AutorService,
    private assuntoService: AssuntoService
  ) {
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
    this.registerForm = this.fb.group({
      codL: [0, Validators.required],
      titulo: ['', [Validators.required, Validators.maxLength(40)]],
      editora: ['', [Validators.required, Validators.maxLength(40)]],
      edicao: [0, Validators.required],
      anoPublicacao: ['', [Validators.required, Validators.maxLength(4)]],
      autores: [[], Validators.required],
      assuntos: [[], Validators.required],
    });
  }

  ngOnInit() {
    this.getAutores();
    this.getAssuntos();
    this.loadLivro();
    this.bsConfig = Object.assign({
      minMode: this.minMode,
      dateInputFormat: 'YYYY',
    });
  }

  loadLivro() {
    this.livroId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.livroId)
      this.livroService.getLivro(+this.livroId).subscribe({
        next: (livro: Livro) => {
          // livro.autores.map((autor) => {
          //   console.log(`autor livro: ${autor.codAu}`);
          //   this.dropdownAutorList.map((dropAutor) => {
          //     console.log(`dropAutor autor livro: ${dropAutor.codAu}`);
          //     if (dropAutor.codAu === autor.codAu)
          //       autoresSelected.push(dropAutor);
          //   });
          // });

          this.livro = livro;

          let autoresSelected: Autor[] = livro.autores.map(({ autor }) => ({
            codAu: autor.codAu,
            nome: autor.nome,
          }));

          let assuntosSelected: Assunto[] = livro.assuntos.map(
            ({ assunto }) => ({
              codAs: assunto.codAs,
              descricao: assunto.descricao,
            })
          );

          this.registerForm.patchValue({
            ...livro,
            autores: autoresSelected,
            assuntos: assuntosSelected,
          });
        },
        error: (error) => console.log(error),
      });
  }
  onSubmit() {
    if (this.livro) {
      this.livro = this.registerForm.value;
      this.livro.autores = this.livro.autores.map(
        (val) =>
          ({
            codAu: val.codAu,
            codL: this.livro.codL,
          } as LivroAutor)
      );

      this.livro.assuntos = this.livro.assuntos.map(
        (val) =>
          ({
            codAs: val.codAs,
            codL: this.livro.codL,
          } as LivroAssunto)
      );
      console.log(this.livro);

      this.livroService.update(this.livro).subscribe({
        next: () => {
          this.toastr.success('Livros salvo com sucesso!');
          this.useCache.emit(false);
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
    console.log('$event is ', $event);
  }
  onValueChange($event: Date) {
    console.log($event);
    let currentYear = $event.getFullYear();
    this.registerForm.patchValue({ anoPublicacao: currentYear });
  }
}
