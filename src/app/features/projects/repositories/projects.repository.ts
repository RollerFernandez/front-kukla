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
      .set('province', filters?.province ?? '')
      .set('department', filters?.department ?? '')
      .set('minAmount', filters?.amountRange[0] ?? '')
      .set('maxAmount', filters?.amountRange[1] ?? '')
      .set('minDate', filters?.minDate ? formatISO(filters.minDate, { representation: 'date' }) : '')
      .set('maxDate', filters?.maxDate ? formatISO(filters.maxDate, { representation: 'date' }) : '');

    filters?.status.filter(s => s.checked).forEach(s => params = params.append('status', s.statusId));
    filters?.regions.filter(r => r.checked).forEach(r => params = params.append('region', r.regionId));

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
