import { ProjectQuestionType, QuestionValidationType } from "../base";

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

export interface QuestionValidation {
  id: number;
  type: QuestionValidationType;
  parameter: string;
  reference: boolean;
  message: string;
};

export interface ProjectQuestion {
  id: number;
  text: string;
  type: ProjectQuestionType;
  parentId: number;
  options?: QuestionOption[];
  responses?: QuestionResponse[];
  validations?: QuestionValidation[];
}
