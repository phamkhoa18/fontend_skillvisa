import { TestBed } from '@angular/core/testing';

import { AuthSGuard } from './auth-s.guard';

describe('AuthSGuard', () => {
  let guard: AuthSGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthSGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
