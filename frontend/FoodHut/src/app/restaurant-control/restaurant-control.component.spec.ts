import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantControlComponent } from './restaurant-control.component';

describe('RestaurantControlComponent', () => {
  let component: RestaurantControlComponent;
  let fixture: ComponentFixture<RestaurantControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantControlComponent]
    });
    fixture = TestBed.createComponent(RestaurantControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
