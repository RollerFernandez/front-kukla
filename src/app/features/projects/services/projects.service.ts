import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProjectsRepository } from "../repositories";
import { Paginate, PaginateQuery, Project } from "src/app/shared/models";
import { ProjectfiltersService } from "./projectfilters.service";
import { FilterType } from "src/app/shared/base";

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly projectfiltersService: ProjectfiltersService,
  ) {}

  getProjects(query: PaginateQuery, filterType?: FilterType): Observable<Paginate<Project>> {
    return this.projectsRepository.getProjects(query, {
      ...this.projectfiltersService.filtersFormGroup.value,
      type: filterType,
    });
  }
}
