import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AccessGuard } from './access.guard';

describe('accessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => AccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
