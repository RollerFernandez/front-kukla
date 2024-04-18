import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { ProjectlistComponent } from './projectlist.component';
import { Paginate, Project } from 'src/app/shared/models';
import { ProjectfiltersRepository, ProjectsRepository } from '../repositories';
import { of, throwError } from 'rxjs';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ProjectfiltersService, ProjectsService } from '../services';
import { ShortCurrencyPipe } from 'src/app/shared/ui';
import { CurrencyPipe } from '@angular/common';
import { ProjectfiltersComponent } from '../projectfilters/projectfilters.component';
import { WithoutAssignedProjectsException } from '../exceptions';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProjectStatusCode } from 'src/app/shared/base';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ProjectStatusComponent } from '../project-status/project-status.component';

const projectsMock: Paginate<Project> = {
  pageIndex: 0,
  pageSize: 3,
  items: [
    {
      "id": 6,
      "name": "CREACION (CONSTRUCCIÃ“N) DE LA SEGUNDA CALZADA DE LA RUTA PE-1N, TRAMO: LAMBAYEQUE PIURA EN LA PROVINCIA DE LAMBAYEQUE DEL DEPARTAMENTO DE LAMBAYEQUE Y LA PROVINCIA DE SECHURA DEL DEPARTAMENTO DE PIURA",
      "uniqueInvestmentCode": "65478943",
      "viableAmount": "2013732521",
      "status": {
          "description": "Asignado",
          "code": ProjectStatusCode.Assigned,
      },
      "office": {
          "id": 1,
          "region": {
              "id": 1,
              "name": "Región 1"
          },
      },
      "district": {
          "name": "Piura",
          "province": {
              "name": "Piura",
              "department": {
                  "name": "Piura"
              }
          }
      },
      "projectAssignments": [
          {
              "createdAt": new Date(),
          }
      ],
      "financialUnit": {
        "organization": {
          "name": "Gobierno regional 1"
        },
      },
      "currency": {
        "isoCode": "USD",
      },
  },
  {
      "id": 4,
      "name": "MEJORAMIENTO DE RIEGO Y GENERACION HIDROENERGETICO DEL ALTO PIURA",
      "uniqueInvestmentCode": "65478942",
      "viableAmount": "2272300920",
      "status": {
          "description": "Asignado",
          "code": ProjectStatusCode.Assigned,
      },
      "office": {
          "id": 1,
          "region": {
              "id": 1,
              "name": "Región 1"
          },
      },
      "district": {
          "name": "Piura",
          "province": {
              "name": "Piura",
              "department": {
                  "name": "Piura"
              }
          }
      },
      "projectAssignments": [
          {
              "createdAt": new Date(),
          }
      ],
      "financialUnit": {
        "organization": {
          "name": "Gobierno regional 1"
        },
      },
      "currency": {
        "isoCode": "USD",
      },
  },
  {
      "id": 5,
      "name": "PROYECTO CHAVIMOCHIC TERCERA ETAPA",
      "uniqueInvestmentCode": "65478941",
      "viableAmount": "1847407252",
      "status": {
          "description": "Asignado",
          "code": ProjectStatusCode.Assigned,
      },
      "office": {
          "id": 2,
          "region": {
              "id": 2,
              "name": "Región 4"
          },
      },
      "district": {
          "name": "Salaverry",
          "province": {
              "name": "Trujillo",
              "department": {
                  "name": "La Libertad"
              }
          }
      },
      "projectAssignments": [
          {
              "createdAt": new Date(),
          }
      ],
      "financialUnit": {
        "organization": {
          "name": "Gobierno regional 1"
        },
      },
      "currency": {
        "isoCode": "USD",
      },
    }
  ],
  total: 6,
  totalPages: 2,
};

const projectsRepositoryMock = {
  getProjects: jest.fn().mockReturnValue(of(projectsMock)),
};

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

describe('ProjectlistComponent', () => {
  let fixture: ComponentFixture<ProjectlistComponent>;
  let projectsRepository: ProjectsRepository;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        UIModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        NgSelectModule,
        BsDatepickerModule.forRoot(),
        AccordionModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'projects/6', component: {} as any },
        ]),
      ],
      declarations: [ProjectlistComponent, ProjectfiltersComponent, ProjectStatusComponent],
      providers: [
        ShortCurrencyPipe,
        CurrencyPipe,
        ProjectsService,
        ProjectfiltersService,
        { provide: ProjectfiltersRepository, useValue: projectfiltersRepositoryMock },
        { provide: ProjectsRepository, useValue: projectsRepositoryMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideComponent(ProjectlistComponent, {
      set: {
        providers: [
          { provide: ProjectfiltersRepository, useValue: projectfiltersRepositoryMock },
          { provide: ProjectsRepository, useValue: projectsRepositoryMock },
        ],
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('table', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ProjectlistComponent);
      projectsRepository = TestBed.inject(ProjectsRepository);
      fixture.detectChanges();
    });

    it('should list projects', () => {
      const tableBody = fixture.nativeElement.querySelector('tbody');
      const rows = tableBody.querySelectorAll('tr');
      expect(rows.length).toBe(3);
    });

    it('should load next/prev page', () => {
      const nextPageMock = { ...projectsMock, pageIndex: 1 };
      jest.spyOn(projectsRepository, 'getProjects').mockReturnValue(of(nextPageMock));
      const nextButton = fixture.nativeElement.querySelector('#paginator-next-button');
      const prevButton = fixture.nativeElement.querySelector('#paginator-prev-button');
      expect(nextButton.disabled).toBeFalsy();
      expect(prevButton.disabled).toBeTruthy();
      nextButton.click();
      expect(projectsRepository.getProjects).toHaveBeenCalledTimes(2);
      fixture.detectChanges();
      expect(nextButton.disabled).toBeTruthy();
      expect(prevButton.disabled).toBeFalsy();
      prevButton.click();
      expect(projectsRepository.getProjects).toHaveBeenCalledTimes(3);
    });

    it('should load on sort', () => {
      const header = fixture.nativeElement.querySelector('th');
      header.click();
      expect(projectsRepository.getProjects).toHaveBeenCalledTimes(2);
    });

    it('should load on filter', () => {
      const filterButton = fixture.nativeElement.querySelector('#apply-filters-button');
      filterButton.click();
      expect(projectsRepository.getProjects).toHaveBeenCalledTimes(2);
    });

    it('should navigate to project detail view', fakeAsync(() => {
      const router = TestBed.inject(Router);
      const button = fixture.nativeElement.querySelector('#project-detail-button-0');
      button.click();
      tick(10);
      expect(router.url).toEqual('/projects/6');
    }));
  });

  describe('empty', () => {
    let projectsRepository: ProjectsRepository;
    const emptyMessage = 'Sin registros\nNo hay registro.';

    beforeEach(() => {
      fixture = TestBed.createComponent(ProjectlistComponent);
      projectsRepository = TestBed.inject(ProjectsRepository);
      jest.spyOn(projectsRepository, 'getProjects').mockReturnValue(throwError(() => new WithoutAssignedProjectsException(emptyMessage)));
      projectsRepository = TestBed.inject(ProjectsRepository);
      fixture.detectChanges();
    });

    it('should not show table', () => {
      const tableBody = fixture.nativeElement.querySelector('tbody');
      expect(tableBody).toBeNull();
      const title = fixture.nativeElement.querySelector('#empty-table-message-title');
      expect(title.textContent).toEqual(emptyMessage.split('\n')[0]);
      const body = fixture.nativeElement.querySelector('#empty-table-message-body');
      expect(body.textContent).toEqual(emptyMessage.split('\n')[1]);
    });
  });
});
