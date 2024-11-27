import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Autor } from 'src/app/shared/models/Autor';
import { AutorService } from '../autor.service';

@Component({
  selector: 'app-autor-update',
  templateUrl: './autor-update.component.html',
  styleUrls: ['./autor-update.component.scss']
})
export class AutorUpdateComponent implements OnInit {
  errors: string[] | null = null;
  @Input() autor: Autor | null = null;
  registerForm: any;
  @Output() useCache= new EventEmitter();
  constructor(private fb: FormBuilder, private router: Router,
    private autorService: AutorService, private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) { }



  ngOnInit() {
    this.registerForm = this.fb.group({
      codAu: [0, [Validators.required]],
      nome: ['', [Validators.required, Validators.maxLength(40)]],
    })
   this.loadAutor();

  }
  loadAutor() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) this.autorService.getAutor(+id).subscribe({
      next: (autor:Autor) => {

        this.autor = autor;
        this.registerForm = this.fb.group({
          codAu: [autor.codAu],
          nome: [autor.nome],
        });
      },
      error: error => console.log(error)
    })
  }
  onSubmit() {
    this.autor = this.registerForm.value;
    console.log(this.autor?.codAu);

    if (this.autor) {
    this.autorService.update(this.autor).subscribe({
      next: () => {
        this.toastr.success('Autor atualizado com sucesso!');
        this.useCache.emit(false);
        this.router.navigateByUrl('/autores')
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
