import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Autor } from 'src/app/shared/models/Autor';
import { AutorService } from '../autor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-autor-item',
  templateUrl: './autor-item.component.html',
  styleUrls: ['./autor-item.component.scss'],
})
export class AutorItemComponent implements OnInit {
  @Input() autores?: Autor[] = [];
  @Output() resetFormSubject: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private autorService: AutorService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}

  remover(codL: number) {
    this.autorService.delete(codL).subscribe({
      next: () => {
        this.toastr.success('Autor deletado com sucesso!');

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
