import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Livro } from 'src/app/shared/models/Livro';
import { LivroService } from '../livro.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-livro-item',
  templateUrl: './livro-item.component.html',
  styleUrls: ['./livro-item.component.scss'],
})
export class LivroItemComponent implements OnInit {
  @Input() livros?: Livro[] = [];
  @Output() resetFormSubject: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private livroService: LivroService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}

  remover(codL: number) {
    this.livroService.delete(codL).subscribe({
      next: () => {
        this.toastr.success('Livro deletado com sucesso!');

        this.resetFormSubject.emit(false);
      },
      error: (error) => {
        console.log(error.error.message);
        console.log(error.error.message);
        this.toastr.error(error.error.message);
      },
    });
  }
}
