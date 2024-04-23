import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProjectsRepository } from "../repositories";
import { PaginateQuery, Project } from "src/app/shared/models";
import { ProjectfiltersService } from "./projectfilters.service";
import { FilterType } from "src/app/shared/base";
import { ProjectList } from "../models";

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly projectfiltersService: ProjectfiltersService,
  ) {}

  getProjects(query: PaginateQuery, filterType?: FilterType): Observable<ProjectList> {
    return this.projectsRepository.getProjects(query, {
      ...this.projectfiltersService.filtersFormGroup.value,
      type: filterType,
    });
  }

  getProject(projectId: number): Observable<Project> {
    return this.projectsRepository.getProject(projectId);
  }
}
