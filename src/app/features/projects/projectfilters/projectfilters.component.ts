import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ProjectfiltersService } from '../services';

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
  bsConfig = { containerClass: 'theme-red' };

  constructor(
    private readonly projectfiltersService: ProjectfiltersService,
  ) {}

  ngOnInit(): void {
    this.projectfiltersService.getFilters().subscribe();
  }

  ngOnDestroy(): void {
    this.projectfiltersService.reset();
  }

  resetFilters(): void {
    this.projectfiltersService.reset();
    this.reset.emit();
  }
}
