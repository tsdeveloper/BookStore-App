import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivrosComponent } from './livros.component';
import { LivroUpdateComponent } from './livro-update/livro-update.component';
import { LivroCreateComponent } from './livro-create/livro-create.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';


const routes: Routes = [
  { path: '', component: LivrosComponent },
  {path: 'cadastrar', component: LivroCreateComponent, data: {breadcrumb: {alias: 'livroCadastrar'}}},
  {path: ':id', component: LivroUpdateComponent, data: {breadcrumb: {alias: 'livroAtualizar'}}},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class LivrosRoutingModule {
}
