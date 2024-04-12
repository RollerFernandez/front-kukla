import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectQuestion } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProjectquestionsRepository {
  constructor(private readonly http: HttpClient) {}

  getQuestions(): Observable<ProjectQuestion[]> {
    return this.http.get<ProjectQuestion[]>(environment.apiUrl + '/project-questions');
  }
}
