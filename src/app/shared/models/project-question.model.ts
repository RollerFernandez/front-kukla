import { ProjectQuestionType } from "../base";

export interface ProjectQuestion {
  id: number;
  text: string;
  type: ProjectQuestionType;
}
