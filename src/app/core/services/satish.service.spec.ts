import { TestBed } from '@angular/core/testing';

import { satishService} from './satish.service';

describe('satishService', () => {
  let service: satishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(satishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
