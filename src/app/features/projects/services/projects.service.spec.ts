import { TestBed } from "@angular/core/testing";
import { ProjectsService } from "./projects.service";
import { ProjectsRepository } from "../repositories";
import { of } from "rxjs";
import { Paginate, Project } from "src/app/shared/models";

const projectsMock: Paginate<Project> = {
  pageIndex: 0,
  pageSize: 10,
  items: [
    {
      id: 4,
      name: 'MEJORAMIENTO DE RIEGO Y GENERACION HIDROENERGETICO DEL ALTO PIURA',
      status: {
        description: 'Asignado',
        code: 'assigned',
      },
      office: {
        id: 1,
        region: {
          id: 1,
          name: 'Región 1',
        },
      },
    },
    {
      id: 5,
      name: 'PROYECTO CHAVIMOCHIC TERCERA ETAPA',
      status: {
        description: 'Asignado',
        code: 'assigned',
      },
      office: {
        id: 2,
        region: {
          id: 2,
          name: 'Región 4',
        },
      },
    },
  ],
  total: 2,
  totalPages: 1,
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
