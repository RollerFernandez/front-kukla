import { User } from "src/app/core/models/auth.models";

export interface ProjectAssignment {
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  userId: number;
  regionId: number;
  user: User;
}

export interface ProjectAssignmentRequest {
  userId: number;
  projectId: number;
}