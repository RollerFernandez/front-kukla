import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ProjectfiltersService } from '../services';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { FilterType } from 'src/app/shared/base';
import { tap } from 'rxjs';

@Component({
  selector: 'app-projectfilters',
  templateUrl: './projectfilters.component.html',
  styleUrls: ['./projectfilters.component.scss']
})
export class ProjectfiltersComponent implements OnDestroy {
  statusList$ = this.projectfiltersService.statusList$;
  regionList$ = this.projectfiltersService.regionList$;
  executiveList$ = this.projectfiltersService.executiveList$.pipe(tap(v => console.log(v)));
  get minDate(): Date { return this.projectfiltersService.minDate; }
  get maxDate(): Date { return this.projectfiltersService.maxDate; }
  departmentList$ = this.projectfiltersService.departmentList$;
  provinceList$ = this.projectfiltersService.provinceList$;
  amountRanges$ = this.projectfiltersService.amountRanges$;
  filtersFormGroup = this.projectfiltersService.filtersFormGroup;
  filtersControl = this.projectfiltersService.filtersControl;
  @Output() filter = new EventEmitter<FilterType>();
  @Output() reset = new EventEmitter<FilterType>();
  @Input() showManagerFilters = false;
  filterType = FilterType;
  isClean = true;

  constructor(
    private readonly projectfiltersService: ProjectfiltersService,
    readonly localeService: BsLocaleService,
  ) {
    localeService.use('es');
  }

  ngOnDestroy(): void {
    this.projectfiltersService.reset();
  }

  applyFilters(filterType: FilterType): void {
    if (this.filtersFormGroup.invalid) {
      return;
    }

    this.isClean = false;
    this.filter.emit(filterType);
  }

  resetFilters(): void {
    this.isClean = true;
    this.projectfiltersService.reset();
    this.reset.emit(this.filtersFormGroup.get('search').value ? FilterType.Search : undefined);
  }
}
