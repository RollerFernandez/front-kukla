import { TestBed } from '@angular/core/testing';

import { ProjectquestionsRepository } from './projectquestions.repository';

describe('ProjectquestionsRepository', () => {
  let service: ProjectquestionsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectquestionsRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
