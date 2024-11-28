import { LivroAssunto } from './LivroAssunto';
import { LivroAutor } from './LivroAutor';

// export interface Livro {
//   codL?: number;
//   titulo: string;
//   editora: string;
//   edicao: number;
//   anoPublicacao: string;
//   autores?: LivroAutor[];
//   assuntos?: LivroAssunto[];
// }

export class Livro {
  codL = 0;
  titulo = '';
  editora = '';
  edicao = 0;
  anoPublicacao = '';
  preco = 0;
  autores: LivroAutor[] = [];
  assuntos: LivroAssunto[] = [];
}
