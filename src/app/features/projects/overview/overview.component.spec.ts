import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverviewComponent } from './overview.component';
import { ProjectQuestionComponent } from '../project-question/project-question.component';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { ProjectStatusComponent } from '../project-status/project-status.component';
import { projectfiltersRepositoryMockProvider, projectquestionsRepositoryMockProvider, projectsRepositoryMockProvider } from '../test';
import { ProjectDetailService, ProjectfiltersService, ProjectquestionsService, ProjectsService } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProjectsRepository } from '../repositories';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { RouterTestingModule } from '@angular/router/testing';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
defineLocale('es', esLocale);

const routeMock = {
  snapshot: {
    params: {
      id: 9,
    },
  },
};

const modalServiceMock = {
  show: () => ({
    onHide: of(undefined),
    content: { accepted: true },
  }),
};

describe('OverviewComponent', () => {
  let fixture: ComponentFixture<OverviewComponent>;
  let toastrService: ToastrService;
  let projectsRepository: ProjectsRepository;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UIModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        NgSelectModule,
        BsDatepickerModule.forRoot(),
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'projects', component: {} as any },
        ]),
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
        { provide: BsModalService, useValue: modalServiceMock },
      ],
    })
    .compileComponents();
  });

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
    toastrService = TestBed.inject(ToastrService);
    projectsRepository = TestBed.inject(ProjectsRepository);
    router = TestBed.inject(Router);
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
      jest.spyOn(projectsRepository, 'saveResponses').mockReturnValue(throwError(() => 'No se pudo guardar'));
      const button = fixture.nativeElement.querySelector('#save-button');
      button.click();
      expect(toastrService.error).toHaveBeenCalled();
    });
  });

  describe('send', () => {
    it('should show success toast and redirect to projects list view', () => {
      jest.spyOn(toastrService, 'success');
      jest.spyOn(router, 'navigate');
      const button = fixture.nativeElement.querySelector('#send-button');
      button.click();
      expect(toastrService.success).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['projects']);
    });

    it('should show error toast on save', () => {
      jest.spyOn(toastrService, 'error');
      jest.spyOn(projectsRepository, 'sendProject').mockReturnValue(throwError(() => 'No se pudo enviar'));
      const button = fixture.nativeElement.querySelector('#send-button');
      button.click();
      expect(toastrService.error).toHaveBeenCalled();
    });
  });
});
