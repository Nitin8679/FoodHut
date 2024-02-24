import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantHistoryComponent } from './restaurant-history.component';

describe('RestaurantHistoryComponent', () => {
  let component: RestaurantHistoryComponent;
  let fixture: ComponentFixture<RestaurantHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantHistoryComponent]
    });
    fixture = TestBed.createComponent(RestaurantHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
