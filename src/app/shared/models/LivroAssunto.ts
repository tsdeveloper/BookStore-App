import { Assunto } from './Assunto';
import { Livro } from './Livro';

export interface LivroAssunto {
  codL: number;
  codAs: number;
  livro: Livro;
  assunto: Assunto;
}
