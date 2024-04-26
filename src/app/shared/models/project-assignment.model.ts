import { User } from "src/app/core/models/auth.models";

export interface ProjectAssignment {
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  userId: number;
  regionId: number;
  user: UserResponse;
}

export interface ProjectAssignmentRequest {
  userId: number;
  projectId: number;
}

export class UserResponse {
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  id: number;
  name: string;
  firstSurname: string;
  lastSurname: string;
  email: string;
  phone: string;
  isicomCode: string;
  password: string;
  status: string;
  fullName: string;

}