import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectQuestion } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProjectquestionsRepository {
  constructor(private readonly http: HttpClient) {}

  getQuestions(projectId: number): Observable<ProjectQuestion[]> {
    const params = new HttpParams().set('projectId', projectId);
    return this.http.get<ProjectQuestion[]>(environment.apiUrl + '/project-questions', { params });
  }
}
