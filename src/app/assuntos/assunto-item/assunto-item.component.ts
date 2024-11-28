import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assunto } from 'src/app/shared/models/Assunto';
import { AssuntoService } from '../assunto.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assunto-item',
  templateUrl: './assunto-item.component.html',
  styleUrls: ['./assunto-item.component.scss'],
})
export class AssuntoItemComponent implements OnInit {
  @Input() assuntos?: Assunto[] = [];
  @Output() resetFormSubject: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private assuntoService: AssuntoService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}

  remover(codL: number) {
    this.assuntoService.delete(codL).subscribe({
      next: () => {
        this.toastr.success('Assunto deletado com sucesso!');

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
