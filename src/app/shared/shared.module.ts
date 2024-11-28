import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { RouterModule } from '@angular/router';
import { TextInputComponent } from './text-input/text-input.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, TextInputComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    RouterModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule,
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    CarouselModule,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    NgMultiSelectDropDownModule,
    BsDatepickerModule,
  ],
})
export class SharedModule {}
