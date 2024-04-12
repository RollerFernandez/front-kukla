import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { PagetitleComponent } from './pagetitle/pagetitle.component';
import { LoaderComponent } from './loader/loader.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SortableHeaderDirective } from './sortable-header/sortable-header.directive';
import { ShortCurrencyPipe } from './pipes/short-currency.pipe';
@NgModule({
  declarations: [PagetitleComponent,  LoaderComponent, PaginatorComponent, SortableHeaderDirective, ShortCurrencyPipe],
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  exports: [PagetitleComponent, LoaderComponent, PaginatorComponent, SortableHeaderDirective],
  providers: [CurrencyPipe],
})
export class UIModule { }
