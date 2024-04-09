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
    expect(rows.length).toBe(2);
  });
});
