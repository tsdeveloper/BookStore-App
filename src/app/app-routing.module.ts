import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, data: {breadcrumb: 'Home'}},
  {path: 'livros', loadChildren: () => import('./livros/livros.module').then(m => m.LivrosModule)},
  {path: 'autores', loadChildren: () => import('./autores/autores.module').then(m => m.AutoresModule)},
  {path: 'assuntos', loadChildren: () => import('./assuntos/assuntos.module').then(m => m.AssuntosModule)},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
