import { TestBed } from "@angular/core/testing";
import { ProjectsRepository } from "./projects.repository";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Paginate, Project } from "src/app/shared/models";
import { environment } from "src/environments/environment";

describe('ProjectsRepository', () => {
  let projectsRepository: ProjectsRepository;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    projectsRepository = TestBed.inject(ProjectsRepository);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should send request for get projects', (done) => {
    const responseMock: Paginate<Project> = {
      pageIndex: 0,
      pageSize: 10,
      items: [
        {
          "id": 6,
          "name": "CREACION (CONSTRUCCIÃ“N) DE LA SEGUNDA CALZADA DE LA RUTA PE-1N, TRAMO: LAMBAYEQUE PIURA EN LA PROVINCIA DE LAMBAYEQUE DEL DEPARTAMENTO DE LAMBAYEQUE Y LA PROVINCIA DE SECHURA DEL DEPARTAMENTO DE PIURA",
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
          ]
      },
      {
          "id": 4,
          "name": "MEJORAMIENTO DE RIEGO Y GENERACION HIDROENERGETICO DEL ALTO PIURA",
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
          ]
      },
      {
          "id": 5,
          "name": "PROYECTO CHAVIMOCHIC TERCERA ETAPA",
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
          ]
        }
      ],
      total: 2,
      totalPages: 1,
    };

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
      url: environment.apiUrl + '/projects?pageIndex=0&pageSize=10&orderColumn=project.name&orderDirection=ASC',
    });
    expectedRequest.flush(responseMock);
  });
});