import { Component, Input, OnInit } from '@angular/core';
import { Assunto } from 'src/app/shared/models/Assunto';

@Component({
  selector: 'app-assunto-item',
  templateUrl: './assunto-item.component.html',
  styleUrls: ['./assunto-item.component.scss']
})
export class AssuntoItemComponent implements OnInit {
  @Input() assuntos?: Assunto[] = [];

  constructor() { }

  ngOnInit() {
  }

}
