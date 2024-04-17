import { Component, OnInit } from '@angular/core';
import { Project, ProjectQuestion } from 'src/app/shared/models';
import { ProjectDetailService, ProjectfiltersService, ProjectquestionsService, ProjectsService } from '../services';
import { ActivatedRoute } from '@angular/router';
import { ProjectfiltersRepository, ProjectquestionsRepository, ProjectsRepository } from '../repositories';
import { ProjectStatusCode, saveErrorMessage, toastErrorTitle, toastSuccessTitle } from 'src/app/shared/base';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs';

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
  projectForm = this.projectDetailService.projectForm;
  responsesForm = this.projectDetailService.responsesForm;

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly projectquestionsService: ProjectquestionsService,
    private readonly projectDetailService: ProjectDetailService,
    private readonly toastrService: ToastrService,
    route: ActivatedRoute,
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
    if (this.projectForm.invalid) {
      console.log(this.responsesForm.get('6').get('response').errors)
      console.log(this.responsesForm.get('7').get('response').errors)
      console.log(this.responsesForm.value)
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
}
