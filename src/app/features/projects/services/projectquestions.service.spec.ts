import { TestBed } from '@angular/core/testing';

import { ProjectquestionsService } from './projectquestions.service';

describe('ProjectquestionsService', () => {
  let service: ProjectquestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectquestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
