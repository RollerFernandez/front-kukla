import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectfiltersComponent } from './projectfilters.component';
import { of } from 'rxjs';
import { ProjectfiltersService } from '../services';
import { ProjectfiltersRepository } from '../repositories';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from 'ngx-slider-v2';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ShortCurrencyPipe } from 'src/app/shared/ui';
import { CurrencyPipe } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

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
  let component: ProjectfiltersComponent;
  let fixture: ComponentFixture<ProjectfiltersComponent>;
  let projectfiltersService: ProjectfiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        NgxSliderModule,
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
    component = fixture.componentInstance;
    projectfiltersService = TestBed.inject(ProjectfiltersService);
    fixture.detectChanges();
  });

  describe('show controls', () => {
    it('should show status checkboxes', () => {
      const checkboxes = fixture.nativeElement.querySelectorAll('[id^="status-checkbox-"]');
      expect(checkboxes.length).toBe(filtersMock.status.length);
      const title = checkboxes[0].closest('.col-12').querySelector('h5');
      expect(title.textContent).toBe('Estado');
    });

    it('should show regions checkboxes', () => {
      const checkboxes = fixture.nativeElement.querySelectorAll('[id^="region-checkbox-"]');
      expect(checkboxes.length).toBe(filtersMock.regions.length);
      const title = checkboxes[0].closest('.col-12').querySelector('h5');
      expect(title.textContent).toBe('Región');
    });

    it('should show departments radios', () => {
      const radios = fixture.nativeElement.querySelectorAll('[id^="department-radio-"]');
      expect(radios.length).toBe(filtersMock.departments.length);
      const title = radios[0].closest('.col-12').querySelector('h5');
      expect(title.textContent).toBe('Departamento');
    });

    it('should show provinces radios', () => {
      const radios = fixture.nativeElement.querySelectorAll('[id^="province-radio-"]');
      expect(radios.length).toBe(filtersMock.provinces.length);
      const title = radios[0].closest('.col-12').querySelector('h5');
      expect(title.textContent).toBe('Provincia');
    });
  });

  describe('set values', () => {
    beforeEach(() => {
      const status = fixture.nativeElement.querySelector('[id^="status-checkbox-"]');
      status.click();
      const regions = fixture.nativeElement.querySelectorAll('[id^="region-checkbox-"]');
      regions.forEach(i => i.click());
      const department = fixture.nativeElement.querySelector('[id^="department-radio-"]');
      department.click();
      const province = fixture.nativeElement.querySelector('[id^="province-radio-"]');
      province.click();
    });

    it('should set filters', () => {
      expect(projectfiltersService.filtersFormGroup.value).toEqual({
        "amountRange": [1847407252, 2272300920],
        "department": 3,
        "maxDate": null,
        "minDate": null,
        "province": 4,
        "regions": [
          { "checked": true, "regionId": 2 },
          { "checked": true, "regionId": 1 },
        ],
        "status": [
          { "checked": true, "statusId": 2 },
        ],
      });
    });

    it('should reset form', () => {
      const resetButton = fixture.nativeElement.querySelector('[id^="remove-filters-button"]');
      resetButton.click();
      expect(projectfiltersService.filtersFormGroup.value).toEqual({
        "amountRange": [1847407252, 2272300920],
        "department": null,
        "maxDate": null,
        "minDate": null,
        "province": null,
        "regions": [
          { "checked": false, "regionId": 2 },
          { "checked": false, "regionId": 1 },
        ],
        "status": [
          { "checked": false, "statusId": 2 },
        ],
      });
    });
  });
});
