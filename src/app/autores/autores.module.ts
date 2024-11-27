import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoresComponent } from './autores.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { AutoresRoutingModule } from './autores-routing.module';
import { AutorCreateComponent } from './autor-create/autor-create.component';
import { AutorUpdateComponent } from './autor-update/autor-update.component';
import { AutorItemComponent } from './autor-item/autor-item.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    AutoresRoutingModule,
  ],
  declarations: [AutoresComponent, AutorCreateComponent, AutorUpdateComponent, AutorItemComponent]
})
export class AutoresModule { }
