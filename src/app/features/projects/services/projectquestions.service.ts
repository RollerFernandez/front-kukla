import { Injectable } from '@angular/core';
import { ProjectquestionsRepository } from '../repositories';
import { Observable } from 'rxjs';
import { ProjectQuestion } from 'src/app/shared/models';

@Injectable()
export class ProjectquestionsService {
  constructor(
    private readonly projectquestionsRepository: ProjectquestionsRepository,
  ) {}

  getQuestions(projectId: number): Observable<ProjectQuestion[]> {
    return this.projectquestionsRepository.getQuestions(projectId);
  }
}
