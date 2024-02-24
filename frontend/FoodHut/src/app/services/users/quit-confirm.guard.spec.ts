import { TestBed } from '@angular/core/testing';

import { QuitConfirmGuard } from './quit-confirm.guard';

describe('QuitConfirmGuard', () => {
  let guard: QuitConfirmGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QuitConfirmGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
