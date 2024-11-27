import { Routes, RouterModule } from '@angular/router';
import { AssuntoComponent } from './assunto.component';
import { AssuntoCreateComponent } from './assunto-create/assunto-create.component';
import { AssuntoUpdateComponent } from './assunto-update/assunto-update.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: AssuntoComponent },
  {path: 'cadastrar', component: AssuntoCreateComponent, data: {breadcrumb: {alias: 'assuntoCadastrar'}}},
  {path: ':id', component: AssuntoUpdateComponent, data: {breadcrumb: {alias: 'assuntoAtualizar'}}},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class AssuntoRoutingModule {
}
