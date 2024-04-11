import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ProjectfiltersService } from '../services';
import { ProjectStatus, Region } from 'src/app/shared/models';
import { Options as NgxSliderOptions } from 'ngx-slider-v2';
import { ShortCurrencyPipe } from 'src/app/shared/ui/pipes/short-currency.pipe';

@Component({
  selector: 'app-projectfilters',
  templateUrl: './projectfilters.component.html',
  styleUrls: ['./projectfilters.component.scss']
})
export class ProjectfiltersComponent implements OnInit, OnDestroy {
  get statusList(): ProjectStatus[] { return this.projectfiltersService.statusList; }
  get regionList(): Region[] { return this.projectfiltersService.regionList; }
  get minDate(): Date { return this.projectfiltersService.minDate; }
  get maxDate(): Date { return this.projectfiltersService.maxDate; }
  departmentList$ = this.projectfiltersService.departmentList$;
  provinceList$ = this.projectfiltersService.provinceList$;
  filtersFormGroup = this.projectfiltersService.filtersFormGroup;
  statusFormArray = this.projectfiltersService.statusFormArray;
  regionsFormArray = this.projectfiltersService.regionsFormArray;
  @Output() filter = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
  get amountRangeOptions(): NgxSliderOptions {
    return {
      ceil: this.projectfiltersService.amountRange.maxAmount,
      floor: this.projectfiltersService.amountRange.minAmount,
      step: (this.projectfiltersService.amountRange.maxAmount - this.projectfiltersService.amountRange.minAmount) / 10,
      translate: (value: number): string => {
        return this.shortCurrencyPipe.transform(value, 'PEN');
      }
    }
  }
  bsConfig = { containerClass: 'theme-red' };

  constructor(
    private readonly projectfiltersService: ProjectfiltersService,
    private readonly shortCurrencyPipe: ShortCurrencyPipe,
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
