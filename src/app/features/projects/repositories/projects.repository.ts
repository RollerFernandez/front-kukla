import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { Paginate, PaginateQuery, Project } from "src/app/shared/models";
import { environment } from "src/environments/environment";
import { WithoutAssignedProjectsException } from "../exceptions";

@Injectable({
  providedIn: 'root',
})
export class ProjectsRepository {
  constructor(private readonly http: HttpClient) {}

  getProjects(query: PaginateQuery): Observable<Paginate<Project>> {
    const params = new HttpParams()
      .set('pageIndex', query.pageIndex)
      .set('pageSize', query.pageSize)
      .set('orderColumn', query.orderColumn)
      .set('orderDirection', query.orderDirection)
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
