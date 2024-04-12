import { Injectable } from '@angular/core';
import { ProjectfiltersRepository } from '../repositories';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AmountRange, ProjectFilters } from '../models';
import { AbstractControl, FormControl, UntypedFormGroup } from '@angular/forms';
import { Department, ProjectStatus, Province, Region } from 'src/app/shared/models';
import { isValid } from 'date-fns';

@Injectable()
export class ProjectfiltersService {
  private _statusList = new BehaviorSubject<ProjectStatus[]>([]);
  readonly statusList$ = this._statusList.asObservable();
  private _regionList = new BehaviorSubject<Region[]>([]);
  readonly regionList$ = this._regionList.asObservable();
  private _departmentList = new BehaviorSubject<Department[]>([]);
  readonly departmentList$ = this._departmentList.asObservable();
  private _provinceList = new BehaviorSubject<Province[]>([]);
  readonly provinceList$ = this._provinceList.asObservable();
  private _amountRanges = new BehaviorSubject<AmountRange[]>([]);
  readonly amountRanges$ = this._amountRanges.asObservable();
  filtersFormGroup = new UntypedFormGroup({
    search: new FormControl(null),
    status: new FormControl([]),
    regions: new FormControl([]),
    departments: new FormControl([]),
    provinces: new FormControl([]),
    amountRanges: new FormControl([]),
    minDate: new FormControl(null),
    maxDate: new FormControl(null),
  }, {
    validators: [this.validateDates],
  });
  minDate = new Date();
  maxDate = new Date();
  private allProvinces: Province[] = [];
  get provincesControl(): AbstractControl {
    return this.filtersFormGroup.get('provinces');
  }

  constructor(private readonly projectfiltersRepository: ProjectfiltersRepository) {
    this.filtersFormGroup.get('departments').valueChanges.subscribe((value: number[]) => {
      this._provinceList.next(this.allProvinces.filter((p) => value.includes(p.departmentId)));
      this.provincesControl.setValue(this.provincesControl.value?.filter((id) => this._provinceList.value.find((p) => p.id === id)));
    });

    this.filtersFormGroup.get('minDate').valueChanges.subscribe((value) => {
      if (value && !isValid(value)) {
        this.filtersFormGroup.get('minDate').setValue(null);
      }
    });

    this.filtersFormGroup.get('maxDate').valueChanges.subscribe((value) => {
      if (value && !isValid(value)) {
        this.filtersFormGroup.get('maxDate').setValue(null);
      }
    });
  }

  getFilters(): Observable<ProjectFilters> {
    return this.projectfiltersRepository.getFilters().pipe(
      tap((filters) => {
        this._statusList.next(filters.status);
        this._regionList.next(filters.regions);
        this._departmentList.next(filters.departments);
        this.allProvinces = filters.provinces;
        this._amountRanges.next(filters.amountRanges);
        this.minDate = filters.dateRange.minDate;
        this.minDate = filters.dateRange.maxDate;
      }),
    );
  }

  reset(): void {
    this.filtersFormGroup.reset({
      status: [],
      regions: [],
      departments: [],
      provinces: [],
      amountRanges: [],
    });
  }

  validateDates(control: AbstractControl): { invalidDateRange: boolean } | null {
    const minDate = control.get('minDate').value;
    const maxDate = control.get('maxDate').value;

    if (minDate && maxDate && maxDate < minDate) {
      return { invalidDateRange: true };
    }

    return null;
  }
}
