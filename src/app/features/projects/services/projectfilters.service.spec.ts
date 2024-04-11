import { TestBed } from '@angular/core/testing';

import { ProjectfiltersService } from './projectfilters.service';
import { ProjectfiltersRepository } from '../repositories';
import { of } from 'rxjs';

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
  "amountRange": {
    "minAmount": 1847407252,
    "maxAmount": 2272300920
  },
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

  it('should return status', () => {
    service.getFilters().subscribe();
    expect(service.statusList.length).toBe(filtersMock.status.length);
  });

  it('should return regions', () => {
    service.getFilters().subscribe();
    expect(service.regionList.length).toBe(filtersMock.regions.length);
  });

  it('should return amount range', () => {
    service.getFilters().subscribe();
    expect(service.amountRange).toBe(filtersMock.amountRange);
  });

  it('should add status controls', () => {
    service.getFilters().subscribe();
    expect(service.statusFormArray.length).toBe(filtersMock.status.length);
  });

  it('should add region controls', () => {
    service.getFilters().subscribe();
    expect(service.regionsFormArray.length).toBe(filtersMock.regions.length);
  });
});
