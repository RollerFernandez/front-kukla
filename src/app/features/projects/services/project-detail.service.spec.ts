import { TestBed } from '@angular/core/testing';
import { ProjectDetailService } from './project-detail.service';
import { projectsRepositoryMockProvider, questionListMock } from '../test';

describe('ProjectDetailService', () => {
  let service: ProjectDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectDetailService,
        projectsRepositoryMockProvider,
      ],
    });
    service = TestBed.inject(ProjectDetailService);
  });

  it('should add form group for every question', () => {
    expect(Object.entries(service.responsesForm.controls).length).toBe(0);
    service.addQuestions(questionListMock);
    expect(Object.entries(service.responsesForm.controls).length).toBe(questionListMock.length);
  });

  it('should return success message for save responses', (done) => {
    service.addQuestions(questionListMock);
    service.saveResponses(3).subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
        done();
      },
    });
  });
});
