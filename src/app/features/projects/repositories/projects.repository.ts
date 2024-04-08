import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Paginate, PaginateQuery, Project } from "src/app/shared/models";
import { environment } from "src/environments/environment";

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
    return this.http.get<any>(environment.apiUrl + '/projects', { params });
  }
}
