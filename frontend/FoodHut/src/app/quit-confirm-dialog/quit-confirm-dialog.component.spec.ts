import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitConfirmDialogComponent } from './quit-confirm-dialog.component';

describe('QuitConfirmDialogComponent', () => {
  let component: QuitConfirmDialogComponent;
  let fixture: ComponentFixture<QuitConfirmDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuitConfirmDialogComponent]
    });
    fixture = TestBed.createComponent(QuitConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
