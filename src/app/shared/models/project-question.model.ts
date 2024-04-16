import { ProjectQuestionType } from "../base";

export interface QuestionOption {
  id: number;
  text: string;
  parentId?: number;
}

export interface QuestionResponse {
  id: number;
  text?: string;
  questionOptionId?: number;
}

export interface ProjectQuestion {
  id: number;
  text: string;
  type: ProjectQuestionType;
  parentId: number;
  options?: QuestionOption[];
  responses?: QuestionResponse[];
}
