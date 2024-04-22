import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { PaginateQuery, Project } from "src/app/shared/models";
import { environment } from "src/environments/environment";
import { WithoutAssignedProjectsException } from "../exceptions";
import { ProjectData, ProjectActiveFilters, ProjectList } from "../models";
import { formatISO } from "date-fns";
import { ProjectAction } from "src/app/shared/base";

@Injectable()
export class ProjectsRepository {
  constructor(private readonly http: HttpClient) {}

  getProjects(query: PaginateQuery, filters?: ProjectActiveFilters): Observable<ProjectList> {
    let params = new HttpParams()
      .set('pageIndex', query.pageIndex)
      .set('pageSize', query.pageSize)
      .set('orderColumn', query.orderColumn)
      .set('orderDirection', query.orderDirection)
      .set('search', filters?.search ?? '')
      .set('minDate', filters?.filters?.minDate ? formatISO(filters.filters.minDate, { representation: 'date' }) : '')
      .set('maxDate', filters?.filters?.maxDate ? formatISO(filters.filters.maxDate, { representation: 'date' }) : '');

    if (filters?.type) params = params.set('type', filters.type);
    filters?.filters?.status?.forEach(s => params = params.append('status', s));
    filters?.filters?.regions?.forEach(r => params = params.append('region', r));
    filters?.filters?.provinces?.forEach(p => params = params.append('province', p));
    filters?.filters?.departments?.forEach(d => params = params.append('department', d));
    filters?.filters?.amountRanges?.forEach(a => params = params.append('amountRange', a));
    filters?.filters?.executives?.forEach(e => params = params.append('executive', e));

    return this.http.get<ProjectList>(environment.apiUrl + '/projects', { params }).pipe(
      catchError((error) => {
        if (!(error instanceof HttpErrorResponse)) {
          throw error;
        }

        if (error.status === HttpStatusCode.NotFound) {
          throw new WithoutAssignedProjectsException(error.error.message);
        }

        throw error;
      }),
    );
  }

  getProject(projectId: number): Observable<Project> {
    return this.http.get<Project>(environment.apiUrl + '/projects/' + projectId);
  }

  saveResponses(projectId: number, projectData: ProjectData): Observable<string> {
    const payload = {
      ...projectData,
      action: ProjectAction.Save,
      responses: Object.values(projectData.responses),
    };

    return this.http.put<string>(environment.apiUrl + '/projects/' + projectId, payload);
  }

  sendProject(projectId: number): Observable<string> {
    const payload = {
      action: ProjectAction.Send,
    };

    return this.http.put<string>(environment.apiUrl + '/projects/' + projectId, payload);
  }
}
