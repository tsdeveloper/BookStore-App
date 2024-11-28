import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
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
import { MatCurrencyFormatModule } from 'mat-currency-format';
import { NgxCurrencyDirective } from 'ngx-currency';
import { CurrencyInputComponent } from './currency-input/currency-input.component';

@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    TextInputComponent,
    CurrencyInputComponent,
  ],
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
    NgxCurrencyDirective,
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
    NgxCurrencyDirective,
    CurrencyInputComponent,
  ],
  providers: [CurrencyPipe, MatCurrencyFormatModule],
})
export class SharedModule {}
