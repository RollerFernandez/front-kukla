export interface Project {
  id: number;
  name: string;
  status: {
    description: string;
    code: string;
  };
  office: {
    id: number;
    region: {
      id: number;
      name: string;
    }
  }
}