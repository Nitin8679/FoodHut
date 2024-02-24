import { Component } from '@angular/core';
import { RoutesService } from '../service/routes.service';

@Component({
  selector: 'app-restaurant-control',
  templateUrl: './restaurant-control.component.html',
  styleUrls: ['./restaurant-control.component.css']
})
export class RestaurantControlComponent {

  constructor(
    private routing:RoutesService
  ){}


  viewRestaurantsBtn(){
    this.routing.restaurantListRoute();
  }
  registerRestaurantBtn(){
    this.routing.registerRestaurantRoute();
  }



}
