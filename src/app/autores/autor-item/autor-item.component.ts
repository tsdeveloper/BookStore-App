import { Component, Input, OnInit } from '@angular/core';
import { Autor } from 'src/app/shared/models/Autor';
import { AutorService } from '../autor.service';

@Component({
  selector: 'app-autor-item',
  templateUrl: './autor-item.component.html',
  styleUrls: ['./autor-item.component.scss'],
})
export class AutorItemComponent implements OnInit {
  @Input() autores?: Autor[] = [];

  constructor(private autorService: AutorService) {}

  ngOnInit() {}

  remover(codL: number) {
    console.log(`remove autor ${codL}`);
    this.autorService.delete(codL);
  }
}
