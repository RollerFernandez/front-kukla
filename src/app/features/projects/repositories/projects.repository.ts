import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { Paginate, PaginateQuery, Project } from "src/app/shared/models";
import { environment } from "src/environments/environment";
import { WithoutAssignedProjectsException } from "../exceptions";
import { ProjectActiveFilters } from "../models";
import { formatISO } from "date-fns";

@Injectable()
export class ProjectsRepository {
  constructor(private readonly http: HttpClient) {}

  getProjects(query: PaginateQuery, filters?: ProjectActiveFilters): Observable<Paginate<Project>> {
    let params = new HttpParams()
      .set('pageIndex', query.pageIndex)
      .set('pageSize', query.pageSize)
      .set('orderColumn', query.orderColumn)
      .set('orderDirection', query.orderDirection)
      .set('search', filters?.search ?? '')
      .set('minDate', filters?.minDate ? formatISO(filters.minDate, { representation: 'date' }) : '')
      .set('maxDate', filters?.maxDate ? formatISO(filters.maxDate, { representation: 'date' }) : '');

    filters?.status?.forEach(s => params = params.append('status', s));
    filters?.regions?.forEach(r => params = params.append('region', r));
    filters?.provinces?.forEach(p => params = params.append('province', p));
    filters?.departments?.forEach(d => params = params.append('department', d));
    filters?.amountRanges?.forEach(a => params = params.append('amountRange', a));

    return this.http.get<Paginate<Project>>(environment.apiUrl + '/projects', { params }).pipe(
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
}
