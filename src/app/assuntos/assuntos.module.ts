import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssuntoComponent } from './assunto.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { AssuntoCreateComponent } from './assunto-create/assunto-create.component';
import { AssuntoUpdateComponent } from './assunto-update/assunto-update.component';
import { AssuntoItemComponent } from './assunto-item/assunto-item.component';
import { AssuntoRoutingModule } from './assunto-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    AssuntoRoutingModule,
  ],
  declarations: [AssuntoComponent, AssuntoCreateComponent, AssuntoUpdateComponent, AssuntoItemComponent]
})
export class AssuntosModule { }
