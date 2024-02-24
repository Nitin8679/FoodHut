import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmDialogComponent } from './order-confirm-dialog.component';

describe('OrderConfirmDialogComponent', () => {
  let component: OrderConfirmDialogComponent;
  let fixture: ComponentFixture<OrderConfirmDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderConfirmDialogComponent]
    });
    fixture = TestBed.createComponent(OrderConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
