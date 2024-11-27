import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssuntoService } from '../assunto.service';

@Component({
  selector: 'app-assunto-create',
  templateUrl: './assunto-create.component.html',
  styleUrls: ['./assunto-create.component.scss']
})
export class AssuntoCreateComponent implements OnInit {

  errors: string[] | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private assuntoService: AssuntoService,
    private toastr: ToastrService
  ) {}

  registerForm = this.fb.group({
    codAs: [0, Validators.required],
    descricao: ['', [Validators.required, Validators.maxLength(20)]],
  });

  ngOnInit() {}
  onSubmit() {
    console.log(this.registerForm.value);
    this.assuntoService.create(this.registerForm.value).subscribe({
      next: () => {
        this.toastr.success('Assunto salvo com sucesso!');

        this.router.navigateByUrl('/assuntos')
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
