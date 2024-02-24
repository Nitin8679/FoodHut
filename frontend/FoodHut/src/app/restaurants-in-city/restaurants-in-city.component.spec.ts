import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsInCityComponent } from './restaurants-in-city.component';

describe('RestaurantsInCityComponent', () => {
  let component: RestaurantsInCityComponent;
  let fixture: ComponentFixture<RestaurantsInCityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantsInCityComponent]
    });
    fixture = TestBed.createComponent(RestaurantsInCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
