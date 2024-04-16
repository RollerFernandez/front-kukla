import { TestBed } from "@angular/core/testing";
import { ProjectsRepository } from "./projects.repository";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { environment } from "src/environments/environment";
import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { WithoutAssignedProjectsException } from "../exceptions";
import { projectMock, projectsMock } from "../test";
import { ProjectData } from "../models";
import { ProjectAction } from "src/app/shared/base";

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
    expectedRequest.flush(projectsMock);
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
        minDate: new Date('2024-04-12'),
        maxDate: new Date('2024-04-12'),
      },
    }).subscribe({
      next: (data) => {
        expect(data.total).toBe(2);
        done();
      },
    });
    const expectedRequest = httpController.expectOne({
      method: 'GET',
      url: environment.apiUrl + '/projects?pageIndex=0&pageSize=10&orderColumn=project.name&orderDirection=ASC&search=&minDate=2024-04-11&maxDate=2024-04-11&status=2&region=1&region=2&province=1&department=1&amountRange=5',
    });
    expectedRequest.flush(projectsMock);
  });

  it('should return project detail', (done) => {
    projectsRepository.getProject(2).subscribe({
      next: (value) => {
        expect(value).toBeTruthy();
        done();
      },
    });
    httpController.expectOne({
      method: 'GET',
      url: environment.apiUrl + '/projects/2',
    }).flush(projectMock);
  });

  it('should send request for save project responses', () => {
    const projectData: ProjectData = {
      responses: {
        '1': { questionId: 1, response: 1 },
        '2': { questionId: 2, response: 1 },
        '3': { questionId: 3, response: 1 },
        '4': { questionId: 4, response: 1 },
        '5': { questionId: 5, response: 1 },
        '6': { questionId: 6, response: 1 },
        '7': { questionId: 7, response: 1 },
      },
    };

    projectsRepository.saveResponses(2, projectData).subscribe();
    const handler = httpController.expectOne({
      method: 'PUT',
      url: environment.apiUrl + '/projects/2',
    });
    const request = handler.request;
    expect(request.body).toEqual({
      action: ProjectAction.Save,
      responses: [
        { questionId: 1, response: 1 },
        { questionId: 2, response: 1 },
        { questionId: 3, response: 1 },
        { questionId: 4, response: 1 },
        { questionId: 5, response: 1 },
        { questionId: 6, response: 1 },
        { questionId: 7, response: 1 },
      ],
    });
  });
});
