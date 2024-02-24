import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantCard2Component } from './restaurant-card2.component';

describe('RestaurantCard2Component', () => {
  let component: RestaurantCard2Component;
  let fixture: ComponentFixture<RestaurantCard2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantCard2Component]
    });
    fixture = TestBed.createComponent(RestaurantCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
