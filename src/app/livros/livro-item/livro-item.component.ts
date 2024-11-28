import { Component, Input, OnInit } from '@angular/core';
import { Livro } from 'src/app/shared/models/Livro';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-item',
  templateUrl: './livro-item.component.html',
  styleUrls: ['./livro-item.component.scss'],
})
export class LivroItemComponent implements OnInit {
  @Input() livros?: Livro[] = [];

  constructor(private livroService: LivroService) {}

  ngOnInit() {}

  remover(codL: number) {
    this.livroService.delete(codL);
  }
}
