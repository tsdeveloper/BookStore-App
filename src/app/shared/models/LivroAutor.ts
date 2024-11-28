import { Autor } from './Autor';
import { Livro } from './Livro';

export interface LivroAutor {
  codL: number;
  codAu: number;
  livro: Livro;
  autor: Autor;
}
