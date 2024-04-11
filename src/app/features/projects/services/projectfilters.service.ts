import { Injectable } from '@angular/core';
import { ProjectfiltersRepository } from '../repositories';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AmountRange, ProjectFilters } from '../models';
import { FormArray, FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { Department, ProjectStatus, Province, Region } from 'src/app/shared/models';

@Injectable()
export class ProjectfiltersService {
  private _statusList = new BehaviorSubject<ProjectStatus[]>([]);
  get statusList(): ProjectStatus[] { return this._statusList.value; }
  private _regionList = new BehaviorSubject<Region[]>([]);
  get regionList(): Region[] { return this._regionList.value; }
  private _departmentList = new BehaviorSubject<Department[]>([]);
  readonly departmentList$ = this._departmentList.asObservable();
  private _provinceList = new BehaviorSubject<Province[]>([]);
  readonly provinceList$ = this._provinceList.asObservable();
  amountRange: AmountRange = {
    minAmount: 0,
    maxAmount: 0,
  };
  filtersFormGroup = new UntypedFormGroup({
    status: new FormArray([]),
    regions: new FormArray([]),
    department: new FormControl(null),
    province: new FormControl(null),
    amountRange: new FormControl([null, null]),
    minDate: new FormControl(null),
    maxDate: new FormControl(null),
  });
  get statusFormArray(): FormArray {
    return this.filtersFormGroup.get('status') as FormArray;
  }
  get regionsFormArray(): FormArray {
    return this.filtersFormGroup.get('regions') as FormArray;
  }
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
        this.amountRange = filters.amountRange;
        this.filtersFormGroup.get('amountRange').patchValue([Number(this.amountRange.minAmount), Number(this.amountRange.maxAmount)]);
        this.minDate = filters.dateRange.minDate;
        this.minDate = filters.dateRange.maxDate;
        this._statusList.value.forEach(s => {
          this.statusFormArray.push(new FormGroup({
            statusId: new FormControl(s.id),
            checked: new FormControl(false),
          }));
        });
        this._regionList.value.forEach(r => {
          this.regionsFormArray.push(new FormGroup({
            regionId: new FormControl(r.id),
            checked: new FormControl(false),
          }));
        });
      }),
    );
  }

  reset(): void {
    this.statusFormArray.controls.forEach(c => c.patchValue({ checked: false }));
    this.regionsFormArray.controls.forEach(c => c.patchValue({ checked: false }));
    this.filtersFormGroup.get('department').reset();
    this.filtersFormGroup.get('province').reset();
    this.filtersFormGroup.get('amountRange').patchValue([this.amountRange.minAmount, this.amountRange.maxAmount]);
    this.filtersFormGroup.get('minDate').reset();
    this.filtersFormGroup.get('maxDate').reset();
  }
}
