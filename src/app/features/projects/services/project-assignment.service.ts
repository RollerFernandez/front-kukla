import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProjectAssignment, ProjectAssignmentRequest } from 'src/app/shared/models';

@Injectable()
export class ProjectAssignmentService {
  constructor(private readonly http: HttpClient) {}

  getUsersByRegionId(regionId: number): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/user-regions/region/${regionId}`

    );
  }

  save(projectAssignmentList: ProjectAssignmentRequest[]): Observable<ProjectAssignment> {
    return this.http.post<ProjectAssignment>(
      `${environment.apiUrl}/project-assignments`,
      projectAssignmentList

    );
  }
}
