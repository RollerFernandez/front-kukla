import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OverviewComponent } from './overview.component';
import { ProjectQuestionComponent } from '../project-question/project-question.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { ProjectStatusComponent } from '../project-status/project-status.component';
import { projectfiltersRepositoryMockProvider, projectquestionsRepositoryMockProvider, projectsRepositoryMockProvider } from '../test';
import { ProjectDetailService, ProjectfiltersService, ProjectquestionsService, ProjectsService } from '../services';
import { ActivatedRoute } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProjectsRepository } from '../repositories';
import { throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
defineLocale('es', esLocale);

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
  let toastrService: ToastrService;
  let projectsRepository: ProjectsRepository;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        UIModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        NgSelectModule,
        BsDatepickerModule.forRoot(),
        NoopAnimationsModule,
      ],
      declarations: [OverviewComponent, ProjectQuestionComponent, ProjectStatusComponent],
      providers: [
        projectquestionsRepositoryMockProvider,
        projectsRepositoryMockProvider,
        projectfiltersRepositoryMockProvider,
        ProjectquestionsService,
        ProjectsService,
        ProjectfiltersService,
        ProjectDetailService,
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
    toastrService = TestBed.inject(ToastrService);
    projectsRepository = TestBed.inject(ProjectsRepository);
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('save', () => {
    it('should show success toast on save', () => {
      jest.spyOn(toastrService, 'success');
      const button = fixture.nativeElement.querySelector('#save-button');
      button.click();
      expect(toastrService.success).toHaveBeenCalled();
    });

    it('should show error toast on save', () => {
      jest.spyOn(toastrService, 'error');
      jest.spyOn(projectsRepository, 'saveResponses').mockReturnValue(throwError(() => new Error('No se pudo guardar')));
      const button = fixture.nativeElement.querySelector('#save-button');
      button.click();
      expect(toastrService.error).toHaveBeenCalled();
    });
  });
});
