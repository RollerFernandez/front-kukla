import { Paginate, Project } from "src/app/shared/models";

export interface ProjectList extends Paginate<Project> {
  showExecutive: boolean;
}
