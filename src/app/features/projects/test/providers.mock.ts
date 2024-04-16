import { of } from "rxjs";
import { ProjectfiltersRepository, ProjectquestionsRepository, ProjectsRepository } from "../repositories";
import { filtersMock, projectMock, projectsMock, questionListMock } from "./objects.mock";

export const projectquestionsRepositoryMock = {
  getQuestions: () => of(questionListMock),
};
export const projectquestionsRepositoryMockProvider = { provide: ProjectquestionsRepository, useValue: projectquestionsRepositoryMock };
export const projectsRepositoryMock = {
  getProjects: () => of(projectsMock),
  getProject: () => of(projectMock),
};
export const projectsRepositoryMockProvider = { provide: ProjectsRepository, useValue: projectsRepositoryMock };
export const projectfiltersRepositoryMock = {
  getFilters: () => of(filtersMock),
};
export const projectfiltersRepositoryMockProvider = { provide: ProjectfiltersRepository, useValue: projectfiltersRepositoryMock };

