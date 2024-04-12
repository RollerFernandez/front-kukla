import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { UIModule } from '../../shared/ui/ui.module';

// dropzone
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NgApexchartsModule } from 'ng-apexcharts';

import { ProjectgridComponent } from './projectgrid/projectgrid.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';
import { ProjectfiltersComponent } from './projectfilters/projectfilters.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ShortCurrencyPipe } from 'src/app/shared/ui/pipes/short-currency.pipe';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [ProjectgridComponent, ProjectlistComponent, OverviewComponent, CreateComponent, ProjectfiltersComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    UIModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    NgApexchartsModule,
    NgxDropzoneModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    AccordionModule.forRoot(),
    ReactiveFormsModule,
    NgSelectModule,
  ],
  providers: [ShortCurrencyPipe],
})

export class ProjectsModule { }
