import { TestBed } from '@angular/core/testing';

import { GEventService } from './gevent.service';

describe('GEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GEventService = TestBed.get(GEventService);
    expect(service).toBeTruthy();
  });
});
