import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProjectsRepository } from "../repositories";
import { Paginate, PaginateQuery, Project } from "src/app/shared/models";

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  getProjects(query: PaginateQuery): Observable<Paginate<Project>> {
    return this.projectsRepository.getProjects(query);
  }
}