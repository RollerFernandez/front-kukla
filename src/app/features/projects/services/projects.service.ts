import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProjectsRepository } from "../repositories";
import { Paginate, PaginateQuery, Project } from "src/app/shared/models";
import { ProjectfiltersService } from "./projectfilters.service";

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly projectfiltersService: ProjectfiltersService,
  ) {}

  getProjects(query: PaginateQuery): Observable<Paginate<Project>> {
    return this.projectsRepository.getProjects(query, this.projectfiltersService.filtersFormGroup.value);
  }
}
