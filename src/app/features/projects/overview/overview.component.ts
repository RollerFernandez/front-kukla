import { Component, OnInit } from '@angular/core';
import { Project, ProjectQuestion } from 'src/app/shared/models';
import { ProjectfiltersService, ProjectquestionsService, ProjectsService } from '../services';
import { ActivatedRoute } from '@angular/router';
import { ProjectfiltersRepository, ProjectquestionsRepository, ProjectsRepository } from '../repositories';

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
  ],
})
export class OverviewComponent implements OnInit {
  projectId: number;
  project: Project;
  questions: ProjectQuestion[];
  breadCrumbItems = [{ label: 'Lista de proyectos' }, { label: '', active: true }];

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly projectquestionsService: ProjectquestionsService,
    route: ActivatedRoute,
  ) {
    this.projectId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.projectsService.getProject(this.projectId).subscribe({
      next: (project) => {
        this.project = project;
        this.breadCrumbItems[1].label = this.project.name;
      },
    });

    this.projectquestionsService.getQuestions(this.projectId).subscribe({
      next: (questions) => {
        this.questions = questions;
      },
    });
  }
}
