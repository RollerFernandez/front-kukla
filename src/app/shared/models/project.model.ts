import { ProjectAssignment } from "./project-assignment.model";

export interface Project {
  id: number;
  name: string;
  viableAmount: string;
  uniqueInvestmentCode: string;
  status: {
    description: string;
    code: string;
  };
  office: {
    id: number;
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
    organization: {
      name: string;
    };
  };
  projectAssignments: ProjectAssignment[];
}