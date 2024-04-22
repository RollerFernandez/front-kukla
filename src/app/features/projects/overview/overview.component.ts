import { Component, OnInit } from '@angular/core';
import { Project, ProjectQuestion } from 'src/app/shared/models';
import { ProjectDetailService, ProjectfiltersService, ProjectquestionsService, ProjectsService } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectfiltersRepository, ProjectquestionsRepository, ProjectsRepository } from '../repositories';
import { ProjectStatusCode, saveErrorMessage, toastErrorTitle, toastSuccessTitle } from 'src/app/shared/base';
import { ToastrService } from 'ngx-toastr';
import { switchMap, take, tap } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers: [
    ProjectsService,
    ProjectfiltersService,
    ProjectsRepository,
    ProjectfiltersRepository,
    ProjectquestionsService,
    ProjectquestionsRepository,
    ProjectDetailService,
  ],
})
export class OverviewComponent implements OnInit {
  projectId: number;
  project: Project;
  questions: ProjectQuestion[];
  breadCrumbItems = [{ label: 'Lista de proyectos', link: '/projects' }, { label: '', active: true }];
  get editable(): boolean {
    return [ProjectStatusCode.InProgress, ProjectStatusCode.Observed].includes(this.project?.status.code);
  }
  get isLoading(): boolean { return  this.projectDetailService.isLoading; }
  get disabledSend(): boolean { return  this.projectDetailService.disabledSend; }
  projectForm = this.projectDetailService.projectForm;
  responsesForm = this.projectDetailService.responsesForm;
  modalRef?: BsModalRef;

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly projectquestionsService: ProjectquestionsService,
    private readonly projectDetailService: ProjectDetailService,
    private readonly toastrService: ToastrService,
    route: ActivatedRoute,
    private readonly router: Router,
    private readonly modalService: BsModalService,
  ) {
    this.projectId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.projectsService.getProject(this.projectId).pipe(
      tap((project) => {
        this.project = project;
        this.projectDetailService.project = this.project;
        this.breadCrumbItems[1].label = this.project.name;
      }),
      switchMap(() => this.projectquestionsService.getQuestions(this.projectId)),
    ).subscribe({
      next: (questions) => {
        this.questions = questions;
        this.projectDetailService.addQuestions(questions);
      },
    });
  }

  save(): void {
    this.projectForm.markAllAsTouched();
    if (this.projectForm.invalid) {
      return;
    }

    this.projectDetailService.saveResponses(this.project.id).subscribe({
      next: (response) => {
        this.toastrService.success(response, toastSuccessTitle);
      },
      error: (error) => {
        this.toastrService.error(saveErrorMessage, toastErrorTitle);
        throw error;
      },
    });
  }

  send(): void {
    this.projectDetailService.sendProject(this.project.id).subscribe({
      next: (response) => {
        this.router.navigate(['projects']);
        this.toastrService.success(response, toastSuccessTitle);
      },
      error: (error) => {
        this.toastrService.error(saveErrorMessage, toastErrorTitle);
        throw error;
      },
    });
  }

  openConfirmation(): void {
    if (this.projectForm.invalid) {
      return;
    }

    this.modalRef = this.modalService.show(ConfirmationComponent, { class: 'modal-sm' });

    this.modalRef.onHide.pipe(take(1)).subscribe(() => {
      if (this.modalRef.content.accepted) {
        this.send();
      }
    });
  }
}
