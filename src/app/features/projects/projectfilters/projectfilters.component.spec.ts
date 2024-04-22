import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ProjectfiltersComponent } from './projectfilters.component';
import { of } from 'rxjs';
import { ProjectfiltersService } from '../services';
import { ProjectfiltersRepository } from '../repositories';
import { ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ShortCurrencyPipe } from 'src/app/shared/ui';
import { CurrencyPipe } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { selectOption } from 'src/app/test';
import { NgSelectModule } from '@ng-select/ng-select';

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

describe('ProjectfiltersComponent', () => {
  let fixture: ComponentFixture<ProjectfiltersComponent>;
  let projectfiltersService: ProjectfiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        NgSelectModule,
        BsDatepickerModule.forRoot(),
        AccordionModule.forRoot(),
      ],
      declarations: [ProjectfiltersComponent],
      providers: [
        ProjectfiltersService,
        ShortCurrencyPipe,
        CurrencyPipe,
        { provide: ProjectfiltersRepository, useValue: projectfiltersRepositoryMock },
      ],
    });
    fixture = TestBed.createComponent(ProjectfiltersComponent);
    projectfiltersService = TestBed.inject(ProjectfiltersService);
    projectfiltersService.getFilters().subscribe();
    fixture.detectChanges();
  });

  describe('set values', () => {
    beforeEach(fakeAsync(() => {
      selectOption(fixture, 'status-select', 1);
      selectOption(fixture, 'regions-select', 1);
      selectOption(fixture, 'departments-select', 1);
      selectOption(fixture, 'provinces-select', 1);
    }));

    it('should set filters', () => {
      expect(projectfiltersService.filtersFormGroup.value).toEqual({
        "search": null,
        "filters": {
          "amountRanges": [],
          "departments": [2],
          "maxDate": null,
          "minDate": null,
          "provinces": [3],
          "regions": [1],
          "status": [2],
        },
      });
    });

    it('should reset form', () => {
      const resetButton = fixture.nativeElement.querySelector('[id^="remove-filters-button"]');
      resetButton.click();
      expect(projectfiltersService.filtersFormGroup.value).toEqual({
        "search": null,
        "filters": {
          "amountRanges": [],
          "departments": [],
          "maxDate": null,
          "minDate": null,
          "provinces": [],
          "regions": [],
          "status": [],
        },
      });
    });
  });
});
