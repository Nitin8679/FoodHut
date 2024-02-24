import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsInLocationComponent } from './restaurants-in-location.component';

describe('RestaurantsInLocationComponent', () => {
  let component: RestaurantsInLocationComponent;
  let fixture: ComponentFixture<RestaurantsInLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantsInLocationComponent]
    });
    fixture = TestBed.createComponent(RestaurantsInLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
