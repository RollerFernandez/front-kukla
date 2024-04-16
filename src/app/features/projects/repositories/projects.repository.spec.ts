import { TestBed } from "@angular/core/testing";
import { ProjectsRepository } from "./projects.repository";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Paginate, Project } from "src/app/shared/models";
import { environment } from "src/environments/environment";
import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { WithoutAssignedProjectsException } from "../exceptions";

const responseMock: Paginate<Project> = {
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

describe('ProjectsRepository', () => {
  let projectsRepository: ProjectsRepository;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectsRepository],
    });
    projectsRepository = TestBed.inject(ProjectsRepository);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should send request for get projects', (done) => {
    projectsRepository.getProjects({
      pageIndex: 0,
      pageSize: 10,
      orderColumn: 'project.name',
      orderDirection: 'ASC',
    }).subscribe({
      next: (data) => {
        expect(data.total).toBe(2);
        done();
      },
    });
    const expectedRequest = httpController.expectOne({
      method: 'GET',
      url: environment.apiUrl + '/projects?pageIndex=0&pageSize=10&orderColumn=project.name&orderDirection=ASC&search=&minDate=&maxDate=',
    });
    expectedRequest.flush(responseMock);
  });

  it('should throw WithoutAssignedProjectsException when response status is 404', (done) => {
    projectsRepository.getProjects({
      pageIndex: 0,
      pageSize: 10,
      orderColumn: 'project.name',
      orderDirection: 'ASC',
    }).subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(WithoutAssignedProjectsException);
        done();
      },
    });
    const expectedRequest = httpController.expectOne({
      method: 'GET',
      url: environment.apiUrl + '/projects?pageIndex=0&pageSize=10&orderColumn=project.name&orderDirection=ASC&search=&minDate=&maxDate=',
    });
    expectedRequest.flush({
      message: 'Sin registros',
    }, {
      status: HttpStatusCode.NotFound,
      statusText: 'Not Found',
    });
  });

  it('should throw HttpErrorResponse when response status is 500', (done) => {
    projectsRepository.getProjects({
      pageIndex: 0,
      pageSize: 10,
      orderColumn: 'project.name',
      orderDirection: 'ASC',
    }).subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(HttpErrorResponse);
        done();
      },
    });
    const expectedRequest = httpController.expectOne({
      method: 'GET',
      url: environment.apiUrl + '/projects?pageIndex=0&pageSize=10&orderColumn=project.name&orderDirection=ASC&search=&minDate=&maxDate=',
    });
    expectedRequest.flush({
      message: 'Sin registros',
    }, {
      status: HttpStatusCode.InternalServerError,
      statusText: 'Internal Server Error',
    });
  });

  it('should send request for get projects with filters', (done) => {
    projectsRepository.getProjects({
      pageIndex: 0,
      pageSize: 10,
      orderColumn: 'project.name',
      orderDirection: 'ASC',
    }, {
      filters: {
        status: [2],
        regions: [1, 2],
        departments: [1],
        provinces: [1],
        amountRanges: [5],
        minDate: new Date(),
        maxDate: new Date(),
      },
    }).subscribe({
      next: (data) => {
        expect(data.total).toBe(2);
        done();
      },
    });
    const expectedRequest = httpController.expectOne({
      method: 'GET',
      url: environment.apiUrl + '/projects?pageIndex=0&pageSize=10&orderColumn=project.name&orderDirection=ASC&search=&minDate=2024-04-12&maxDate=2024-04-12&status=2&region=1&region=2&province=1&department=1&amountRange=5',
    });
    expectedRequest.flush(responseMock);
  });
});
