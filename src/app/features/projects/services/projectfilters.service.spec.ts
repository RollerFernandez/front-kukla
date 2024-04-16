import { TestBed } from '@angular/core/testing';
import { ProjectfiltersService } from './projectfilters.service';
import { addDays } from 'date-fns';
import { filtersMock, projectfiltersRepositoryMockProvider } from '../test';

describe('ProjectfiltersService', () => {
  let service: ProjectfiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectfiltersService,
        projectfiltersRepositoryMockProvider,
      ],
    });
    service = TestBed.inject(ProjectfiltersService);
  });

  it('should return status', (done) => {
    service.getFilters().subscribe();
    service.statusList$.subscribe({
      next: (data) => {
        expect(data.length).toEqual(filtersMock.status.length);
        done();
      },
    });
  });

  it('should return regions', (done) => {
    service.getFilters().subscribe();
    service.regionList$.subscribe({
      next: (data) => {
        expect(data.length).toEqual(filtersMock.regions.length);
        done();
      },
    });
  });

  it('should return amount ranges', (done) => {
    service.getFilters().subscribe();
    service.amountRanges$.subscribe({
      next: (data) => {
        expect(data.length).toEqual(filtersMock.amountRanges.length);
        done();
      },
    });
  });

  describe('dates validations', () => {
    it('should clear invalid min date', () => {
      const invalidDate = new Date('prueba');
      service.filtersFormGroup.patchValue({
        filters: {
          minDate: invalidDate,
        },
      });
      expect(service.minDateControl.value).toBeNull();
    });

    it('should clear invalid max date', () => {
      const invalidDate = new Date('prueba');
      service.filtersFormGroup.patchValue({
        filters: {
          maxDate: invalidDate,
        },
      });
      expect(service.maxDateControl.value).toBeNull();
    });

    it('formGroup should be invalid when max date in less than min date', () => {
      service.filtersFormGroup.patchValue({
        filters: {
          minDate: addDays(new Date(), 1),
          maxDate: new Date(),
        },
      });
      expect(service.filtersControl.invalid).toBeTruthy();
      expect(service.filtersControl.errors.invalidDateRange).toBeTruthy();
    });
  });
});
