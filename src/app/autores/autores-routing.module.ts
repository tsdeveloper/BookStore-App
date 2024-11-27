import { Routes, RouterModule } from '@angular/router';
import { AutoresComponent } from './autores.component';
import { AutorCreateComponent } from './autor-create/autor-create.component';
import { AutorUpdateComponent } from './autor-update/autor-update.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: AutoresComponent },
  {path: 'cadastrar', component: AutorCreateComponent, data: {breadcrumb: {alias: 'autorCadastrar'}}},
  {path: ':id', component: AutorUpdateComponent, data: {breadcrumb: {alias: 'autorAtualizar'}}},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class AutoresRoutingModule {
}
