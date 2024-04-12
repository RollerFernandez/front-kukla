import { TestBed } from '@angular/core/testing';

import { ProjectfiltersService } from './projectfilters.service';
import { ProjectfiltersRepository } from '../repositories';
import { of } from 'rxjs';
import { addDays } from 'date-fns';

const filtersMock = {
  "status": [
    {
      "id": 2,
      "description": "Asignado",
      "code": "assigned"
    }
  ],
  "regions": [
    {
      "id": 2,
      "name": "Región 4"
    },
    {
      "id": 1,
      "name": "Región 1"
    }
  ],
  "departments": [
    {
      "id": 3,
      "name": "La Libertad"
    },
    {
      "id": 2,
      "name": "Piura"
    }
  ],
  "provinces": [
    {
      "id": 4,
      "name": "Trujillo",
      "departmentId": 3
    },
    {
      "id": 3,
      "name": "Piura",
      "departmentId": 2
    }
  ],
  "districts": [
    {
      "id": 6,
      "name": "Salaverry",
      "provinceId": 4
    },
    {
      "id": 5,
      "name": "Piura",
      "provinceId": 3
    }
  ],
  "amountRanges": [
    {
      "id": 4,
      "minAmount": 50000001,
      "maxAmount": null,
      "currency": {
          "isoCode": "PEN"
      }
    },
  ],
  "dateRange": {
    "maxDate": new Date("2024-04-05T17:20:30.654Z"),
    "minDate": new Date("2024-04-05T17:20:30.633Z")
  }
};

const projectfiltersRepositoryMock = {
  getFilters: () => of(filtersMock),
};

describe('ProjectfiltersService', () => {
  let service: ProjectfiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectfiltersService,
        { provide: ProjectfiltersRepository, useValue: projectfiltersRepositoryMock },
      ],
    });
    service = TestBed.inject(ProjectfiltersService);
  });

  it('should return status', (done) => {
    service.getFilters().subscribe();
    service.statusList$.subscribe({
      next: (data) => {
        expect(data.length).toEqual(filtersMock.status.length);
        done();
      },
    });
  });

  it('should return regions', (done) => {
    service.getFilters().subscribe();
    service.regionList$.subscribe({
      next: (data) => {
        expect(data.length).toEqual(filtersMock.regions.length);
        done();
      },
    });
  });

  it('should return amount ranges', (done) => {
    service.getFilters().subscribe();
    service.amountRanges$.subscribe({
      next: (data) => {
        expect(data.length).toEqual(filtersMock.amountRanges.length);
        done();
      },
    });
  });

  describe('dates validations', () => {
    it('should clear invalid min date', () => {
      const invalidDate = new Date('prueba');
      service.filtersFormGroup.patchValue({
        filters: {
          minDate: invalidDate,
        },
      });
      expect(service.minDateControl.value).toBeNull();
    });

    it('should clear invalid max date', () => {
      const invalidDate = new Date('prueba');
      service.filtersFormGroup.patchValue({
        filters: {
          maxDate: invalidDate,
        },
      });
      expect(service.maxDateControl.value).toBeNull();
    });

    it('formGroup should be invalid when max date in less than min date', () => {
      service.filtersFormGroup.patchValue({
        filters: {
          minDate: addDays(new Date(), 1),
          maxDate: new Date(),
        },
      });
      expect(service.filtersControl.invalid).toBeTruthy();
      expect(service.filtersControl.errors.invalidDateRange).toBeTruthy();
    });
  });
});
