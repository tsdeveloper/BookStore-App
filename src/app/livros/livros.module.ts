import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { LivrosComponent } from './livros.component';
import { LivrosRoutingModule } from './livros-routing.module';
import { LivroCreateComponent } from './livro-create/livro-create.component';
import { LivroUpdateComponent } from './livro-update/livro-update.component';
import { LivroItemComponent } from './livro-item/livro-item.component';



@NgModule({
  declarations: [LivrosComponent, LivroCreateComponent, LivroUpdateComponent, LivroItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    LivrosRoutingModule,
  ]
})
export class LivrosModule { }
