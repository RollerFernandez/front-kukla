import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProjectlistComponent } from './projectlist.component';
import { Paginate, Project } from 'src/app/shared/models';
import { ProjectsRepository } from '../repositories';
import { of } from 'rxjs';
import { UIModule } from 'src/app/shared/ui/ui.module';

const projectsMock: Paginate<Project> = {
  pageIndex: 0,
  pageSize: 10,
  items: [
    {
      "id": 6,
      "name": "CREACION (CONSTRUCCIÃ“N) DE LA SEGUNDA CALZADA DE LA RUTA PE-1N, TRAMO: LAMBAYEQUE PIURA EN LA PROVINCIA DE LAMBAYEQUE DEL DEPARTAMENTO DE LAMBAYEQUE Y LA PROVINCIA DE SECHURA DEL DEPARTAMENTO DE PIURA",
      "uniqueInvestmentCode": "65478943",
      "viableAmount": "2013732521",
      "status": {
          "description": "Asignado",
          "code": "assigned"
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
  },
  {
      "id": 4,
      "name": "MEJORAMIENTO DE RIEGO Y GENERACION HIDROENERGETICO DEL ALTO PIURA",
      "uniqueInvestmentCode": "65478942",
      "viableAmount": "2272300920",
      "status": {
          "description": "Asignado",
          "code": "assigned"
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
  },
  {
      "id": 5,
      "name": "PROYECTO CHAVIMOCHIC TERCERA ETAPA",
      "uniqueInvestmentCode": "65478941",
      "viableAmount": "1847407252",
      "status": {
          "description": "Asignado",
          "code": "assigned"
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
    }
  ],
  total: 2,
  totalPages: 1,
};

const projectsRepositoryMock = {
  getProjects: jest.fn().mockReturnValue(of(projectsMock)),
};

describe('ProjectlistComponent', () => {
  let component: ProjectlistComponent;
  let fixture: ComponentFixture<ProjectlistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UIModule],
      declarations: [ProjectlistComponent],
      providers: [
        { provide: ProjectsRepository, useValue: projectsRepositoryMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should list projects', () => {
    const tableBody = fixture.nativeElement.querySelector('tbody');
    const rows = tableBody.querySelectorAll('tr');
    expect(rows.length).toBe(3);
  });
});
