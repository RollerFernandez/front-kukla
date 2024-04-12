import { ProjectStatusCode } from "../base";

export interface ProjectStatus {
  id: number;
  description: string;
  code: ProjectStatusCode;
}
