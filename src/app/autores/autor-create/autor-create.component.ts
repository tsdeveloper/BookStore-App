import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutorService } from '../autor.service';

@Component({
  selector: 'app-autor-create',
  templateUrl: './autor-create.component.html',
  styleUrls: ['./autor-create.component.scss']
})
export class AutorCreateComponent implements OnInit {

  errors: string[] | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private livroService: AutorService,
    private toastr: ToastrService
  ) {}

  registerForm = this.fb.group({
    codAu: [0, [Validators.required]],
    nome: ['', [Validators.required, Validators.maxLength(40)]],
  });

  ngOnInit() {}
  onSubmit() {
    console.log(this.registerForm.value);
    this.livroService.create(this.registerForm.value).subscribe({
      next: () => {
        this.toastr.success('Autor salvo com sucesso!');

        this.router.navigateByUrl('/autores')
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
