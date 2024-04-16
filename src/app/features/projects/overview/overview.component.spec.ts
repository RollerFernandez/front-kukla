import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OverviewComponent } from './overview.component';
import { ProjectQuestionComponent } from '../project-question/project-question.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { ProjectStatusComponent } from '../project-status/project-status.component';
import { projectfiltersRepositoryMockProvider, projectquestionsRepositoryMockProvider, projectsRepositoryMockProvider } from '../test';
import { ProjectfiltersService, ProjectquestionsService, ProjectsService } from '../services';
import { ActivatedRoute } from '@angular/router';

const routeMock = {
  snapshot: {
    params: {
      id: 9,
    },
  },
};

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UIModule],
      declarations: [OverviewComponent, ProjectQuestionComponent, ProjectStatusComponent],
      providers: [
        projectquestionsRepositoryMockProvider,
        projectsRepositoryMockProvider,
        projectfiltersRepositoryMockProvider,
        ProjectquestionsService,
        ProjectsService,
        ProjectfiltersService,
        { provide: ActivatedRoute, useValue: routeMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideComponent(OverviewComponent, {
      set: {
        providers: [
          projectquestionsRepositoryMockProvider,
          projectsRepositoryMockProvider,
          projectfiltersRepositoryMockProvider,
          ProjectquestionsService,
          ProjectsService,
          ProjectfiltersService,
        ],
      },
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
