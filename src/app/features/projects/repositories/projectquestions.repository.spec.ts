import { TestBed } from '@angular/core/testing';
import { ProjectquestionsRepository } from './projectquestions.repository';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { questionListMock } from '../test';

describe('ProjectquestionsRepository', () => {
  let service: ProjectquestionsRepository;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectquestionsRepository],
    });
    service = TestBed.inject(ProjectquestionsRepository);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should return question list', (done) => {
    service.getQuestions(9).subscribe({
      next: (value) => {
        expect(value.length).toEqual(questionListMock.length);
        done();
      },
    });
    httpController.expectOne({
      method: 'GET',
      url: environment.apiUrl + '/project-questions?projectId=9',
    }).flush(questionListMock);
  });
});
