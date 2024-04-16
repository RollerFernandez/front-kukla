import { TestBed } from '@angular/core/testing';
import { ProjectquestionsService } from './projectquestions.service';
import { projectquestionsRepositoryMockProvider, questionListMock } from '../test';

describe('ProjectquestionsService', () => {
  let service: ProjectquestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        projectquestionsRepositoryMockProvider,
        ProjectquestionsService,
      ],
    });
    service = TestBed.inject(ProjectquestionsService);
  });

  it('should return question list', (done) => {
    service.getQuestions(3).subscribe({
      next: (value) => {
        expect(value.length).toEqual(questionListMock.length);
        done();
      },
    });
  });
});
