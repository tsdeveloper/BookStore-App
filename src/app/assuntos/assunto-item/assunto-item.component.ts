import { Component, Input, OnInit } from '@angular/core';
import { Assunto } from 'src/app/shared/models/Assunto';
import { AssuntoService } from '../assunto.service';

@Component({
  selector: 'app-assunto-item',
  templateUrl: './assunto-item.component.html',
  styleUrls: ['./assunto-item.component.scss'],
})
export class AssuntoItemComponent implements OnInit {
  @Input() assuntos?: Assunto[] = [];

  constructor(private assuntoService: AssuntoService) {}

  ngOnInit() {}

  remover(codL: number) {
    this.assuntoService.delete(codL);
  }
}
