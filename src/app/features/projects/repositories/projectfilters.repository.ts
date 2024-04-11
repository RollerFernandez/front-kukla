import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectFilters } from '../models';

@Injectable()
export class ProjectfiltersRepository {

  constructor(private readonly http: HttpClient) { }

  getFilters(): Observable<ProjectFilters> {
    return this.http.get<ProjectFilters>(environment.apiUrl + '/project-filters').pipe(
      map((response) => {
        return {
          ...response,
          dateRange: {
            minDate: new Date(response.dateRange.minDate),
            maxDate: new Date(response.dateRange.maxDate),
          },
        };
      }),
    );
  }
}
