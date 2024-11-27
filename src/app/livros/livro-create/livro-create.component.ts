import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.scss'],
})
export class LivroCreateComponent implements OnInit {
  errors: string[] | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private livroService: LivroService,
    private toastr: ToastrService
  ) {}

  registerForm = this.fb.group({
    titulo: ['', [Validators.required, Validators.maxLength(40)]],
    editora: ['', [Validators.required, Validators.maxLength(40)]],
    edicao: [0, Validators.required],
    anoPublicacao: ['', [Validators.required, Validators.maxLength(4)]],
  });

  ngOnInit() {}
  onSubmit() {
    console.log(this.registerForm.value);
    this.livroService.create(this.registerForm.value).subscribe({
      next: () => {
        this.toastr.success('Livros salvo com sucesso!');

        this.router.navigateByUrl('/livros')
      },
      error: (error) => {
        console.log(error.error.message);
        this.errors = [];
        this.errors.push(error.error.message);
        console.log(this.errors);
        this.toastr.error(this.errors.at(0))
      },
    });
  }
}
