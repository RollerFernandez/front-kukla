import { Injectable } from '@angular/core';
import { ProjectfiltersRepository } from '../repositories';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AmountRange, ProjectFilters } from '../models';
import { FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { Department, ProjectStatus, Province, Region } from 'src/app/shared/models';

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
    search: new FormControl(''),
    status: new FormControl([]),
    regions: new FormControl([]),
    departments: new FormControl([]),
    provinces: new FormControl([]),
    amountRanges: new FormControl([]),
    minDate: new FormControl(null),
    maxDate: new FormControl(null),
  });
  minDate = new Date();
  maxDate = new Date();

  constructor(private readonly projectfiltersRepository: ProjectfiltersRepository) {}

  getFilters(): Observable<ProjectFilters> {
    return this.projectfiltersRepository.getFilters().pipe(
      tap((filters) => {
        this._statusList.next(filters.status);
        this._regionList.next(filters.regions);
        this._departmentList.next(filters.departments);
        this._provinceList.next(filters.provinces);
        this._amountRanges.next(filters.amountRanges);
        this.minDate = filters.dateRange.minDate;
        this.minDate = filters.dateRange.maxDate;
      }),
    );
  }

  reset(): void {
    this.filtersFormGroup.reset();
  }
}
