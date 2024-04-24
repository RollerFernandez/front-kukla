import { ProjectStatusCode } from "../base";
import { ProjectAssignment } from "./project-assignment.model";

export interface Project {
  id: number;
  name: string;
  viableAmount: string;
  uniqueInvestmentCode: string;
  status: {
    description: string;
    code: ProjectStatusCode;
  };
  office: {
    id: number;
    name?: string;
    region: {
      id: number;
      name: string;
    };
  };
  district: {
    name: string;
    province: {
      name: string;
      department: {
        name: string;
      };
    };
  };
  financialUnit: {
    id?: number;
    name?: string;
    organization: {
      name: string;
    };
  };
  speciality?: {
    name?: string;
  };
  lastStudy?: {
    name?: string;
  };
  feasibilityLevel?: {
    name?: string;
  };
  priority?: string;
  feasibilityDate?: Date;
  updatedAmount?: string;
  description?: string;
  projectAssignments: ProjectAssignment[];
  currency: {
    isoCode: string;
  };
  checked: boolean;
}
