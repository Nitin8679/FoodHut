import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAmountDialogComponent } from './set-amount-dialog.component';

describe('SetAmountDialogComponent', () => {
  let component: SetAmountDialogComponent;
  let fixture: ComponentFixture<SetAmountDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetAmountDialogComponent]
    });
    fixture = TestBed.createComponent(SetAmountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
