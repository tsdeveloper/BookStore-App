import { Component, Input, OnInit } from '@angular/core';
import { Livro } from 'src/app/shared/models/Livro';

@Component({
  selector: 'app-livro-item',
  templateUrl: './livro-item.component.html',
  styleUrls: ['./livro-item.component.scss']
})
export class LivroItemComponent implements OnInit {
  @Input() livros?: Livro[] = [];

  constructor() { }

  ngOnInit() {
  }

}
