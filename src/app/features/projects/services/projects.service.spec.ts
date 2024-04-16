import { TestBed } from "@angular/core/testing";
import { ProjectsService } from "./projects.service";
import { ProjectsRepository } from "../repositories";
import { of } from "rxjs";
import { ProjectfiltersService } from "./projectfilters.service";
import { FormGroup } from "@angular/forms";
import { projectsMock } from "../test";

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
