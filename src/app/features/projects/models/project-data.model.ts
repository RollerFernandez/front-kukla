export interface ProjectData {
  responses: {
    [key: string]: {
      questionId: number;
      response: string | number | Date;
    };
  },
}
