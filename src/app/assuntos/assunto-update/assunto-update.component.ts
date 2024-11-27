import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Assunto } from 'src/app/shared/models/Assunto';
import { AssuntoService } from '../assunto.service';

@Component({
  selector: 'app-assunto-update',
  templateUrl: './assunto-update.component.html',
  styleUrls: ['./assunto-update.component.scss']
})
export class AssuntoUpdateComponent implements OnInit {
  errors: string[] | null = null;
  @Input() assunto: Assunto | null = null;
  registerForm: any;
  @Output() useCache= new EventEmitter();
  constructor(private fb: FormBuilder, private router: Router,
    private assuntoService: AssuntoService, private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) { }



  ngOnInit() {
    this.registerForm = this.fb.group({
      codAs: [0, Validators.required],
      descricao: ['', [Validators.required, Validators.maxLength(20)]],
    })
   this.loadAssunto();

  }
  loadAssunto() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) this.assuntoService.getAssunto(+id).subscribe({
      next: (assunto:Assunto) => {

        this.assunto = assunto;
        this.registerForm = this.fb.group({
          codAs: [assunto.codAs],
          descricao: [assunto.descricao],
        });
      },
      error: error => console.log(error)
    })
  }
  onSubmit() {
    this.assunto = this.registerForm.value;
    console.log(this.assunto?.codAs);

    if (this.assunto) {
    this.assuntoService.update(this.assunto).subscribe({
      next: () => {
        this.toastr.success('Assunto atualizado com sucesso!');
        this.useCache.emit(false);
        this.router.navigateByUrl('/assuntos')
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
