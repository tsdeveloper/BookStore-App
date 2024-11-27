import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LivroService } from '../livro.service';
import { Livro } from 'src/app/shared/models/Livro';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.scss']
})
export class LivroUpdateComponent implements OnInit {
  errors: string[] | null = null;
  @Input() livro: Livro | null = null;
  registerForm: any;
  @Output() useCache= new EventEmitter();
  constructor(private fb: FormBuilder, private router: Router,
    private livroService: LivroService, private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) { }



  ngOnInit() {
    this.registerForm = this.fb.group({
      codI: [0, Validators.required],
      titulo: ['', [Validators.required, Validators.maxLength(40)]],
      editora: ['', [Validators.required, Validators.maxLength(40)]],
      edicao: [0, Validators.required],
      anoPublicacao: ['', [Validators.required, Validators.maxLength(4)]],
    })
   this.loadLivro();

  }
  loadLivro() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) this.livroService.getLivro(+id).subscribe({
      next: (livro:Livro) => {

        this.livro = livro;
        this.registerForm = this.fb.group({
          codI: [livro.codI],
          titulo: [livro.titulo],
          editora: [livro.editora],
          edicao: [livro.edicao],
          anoPublicacao: [livro.anoPublicacao],
        });
      },
      error: error => console.log(error)
    })
  }
  onSubmit() {
    this.livro = this.registerForm.value;
    console.log(this.livro?.codI);
    console.log(this.livro?.edicao);

    if (this.livro) {
    this.livroService.update(this.livro).subscribe({
      next: () => {
        this.toastr.success('Livros salvo com sucesso!');
        this.useCache.emit(false);
        this.router.navigateByUrl('/livros')
      },
      error: (error) => {
        console.log(error.error.message);
        this.errors = [];
        this.errors.push(error.error.message);
        console.log(this.errors);
        this.toastr.error(this.errors.at(0))
      },
    })
  }
  }

}
