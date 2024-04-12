import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ProjectfiltersService } from '../services';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-projectfilters',
  templateUrl: './projectfilters.component.html',
  styleUrls: ['./projectfilters.component.scss']
})
export class ProjectfiltersComponent implements OnInit, OnDestroy {
  statusList$ = this.projectfiltersService.statusList$;
  regionList$ = this.projectfiltersService.regionList$;
  get minDate(): Date { return this.projectfiltersService.minDate; }
  get maxDate(): Date { return this.projectfiltersService.maxDate; }
  departmentList$ = this.projectfiltersService.departmentList$;
  provinceList$ = this.projectfiltersService.provinceList$;
  amountRanges$ = this.projectfiltersService.amountRanges$;
  filtersFormGroup = this.projectfiltersService.filtersFormGroup;
  @Output() filter = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();

  constructor(
    private readonly projectfiltersService: ProjectfiltersService,
    readonly localeService: BsLocaleService,
  ) {
    localeService.use('es');
  }

  ngOnInit(): void {
    this.projectfiltersService.getFilters().subscribe();
  }

  ngOnDestroy(): void {
    this.projectfiltersService.reset();
  }

  applyFilters(): void {
    if (this.filtersFormGroup.invalid) {
      return;
    }

    this.filter.emit();
  }

  resetFilters(): void {
    this.projectfiltersService.reset();
    this.reset.emit();
  }
}
