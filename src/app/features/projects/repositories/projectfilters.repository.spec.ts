import { TestBed } from '@angular/core/testing';

import { ProjectfiltersRepository } from './projectfilters.repository';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('ProjectfiltersRepository', () => {
  let service: ProjectfiltersRepository;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectfiltersRepository],
    });
    service = TestBed.inject(ProjectfiltersRepository);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should return filters', (done) => {
    const projectFiltersMock = {
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
        "minAmount": "1847407252",
        "maxAmount": "2272300920"
      },
      "dateRange": {
        "maxDate": "2024-04-05T17:20:30.654Z",
        "minDate": "2024-04-05T17:20:30.633Z"
      }
    };

    service.getFilters().subscribe({
      next: (filters) => {
        expect(filters.regions.length).toBeGreaterThan(0);
        expect(filters.status.length).toBeGreaterThan(0);
        expect(filters.departments.length).toBeGreaterThan(0);
        expect(filters.provinces.length).toBeGreaterThan(0);
        expect(filters.amountRange).toBeTruthy();
        expect(filters.dateRange).toBeTruthy();
        done();
      },
    });
    httpController.expectOne({
      method: 'GET',
      url: environment.apiUrl + '/project-filters',
    }).flush(projectFiltersMock);
  });
});
