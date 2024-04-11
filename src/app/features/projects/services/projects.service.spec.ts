import { TestBed } from "@angular/core/testing";
import { ProjectsService } from "./projects.service";
import { ProjectsRepository } from "../repositories";
import { of } from "rxjs";
import { Paginate, Project } from "src/app/shared/models";
import { ProjectfiltersService } from "./projectfilters.service";
import { FormGroup } from "@angular/forms";

const projectsMock: Paginate<Project> = {
  pageIndex: 0,
  pageSize: 10,
  items: [
    {
      "id": 6,
      "name": "CREACION (CONSTRUCCIÃ“N) DE LA SEGUNDA CALZADA DE LA RUTA PE-1N, TRAMO: LAMBAYEQUE PIURA EN LA PROVINCIA DE LAMBAYEQUE DEL DEPARTAMENTO DE LAMBAYEQUE Y LA PROVINCIA DE SECHURA DEL DEPARTAMENTO DE PIURA",
      "viableAmount": "2013732521",
      "uniqueInvestmentCode": "65478943",
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
      "viableAmount": "2272300920",
      "uniqueInvestmentCode": "65478942",
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
      "viableAmount": "1847407252",
      "uniqueInvestmentCode": "65478941",
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

const projectfiltersServiceMock = {
  filtersFormGroup: new FormGroup({}),
};

const projectsRepositoryMock = {
  getProjects: jest.fn(),
};

describe('ProjectsService', () => {
  let projectsService: ProjectsService;
  let projectsRepository: ProjectsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectsService,
        { provide: ProjectfiltersService, useValue: projectfiltersServiceMock },
        { provide: ProjectsRepository, useValue: projectsRepositoryMock },
      ],
    });
    projectsService = TestBed.inject(ProjectsService);
    projectsRepository = TestBed.inject(ProjectsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return projects', (done) => {
    jest.spyOn(projectsRepository, 'getProjects').mockReturnValue(of(projectsMock));
    projectsService.getProjects({
      pageIndex: 0,
      pageSize: 10,
      orderColumn: 'project.name',
      orderDirection: 'ASC',
    }).subscribe({
      next: (data) => {
        expect(data).toBeTruthy();
        done();
      },
    });
  });
});
