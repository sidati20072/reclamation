import { TestBed } from '@angular/core/testing';

import { ResetServiceService } from './reset-service.service';

describe('ResetServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResetServiceService = TestBed.get(ResetServiceService);
    expect(service).toBeTruthy();
  });
});
