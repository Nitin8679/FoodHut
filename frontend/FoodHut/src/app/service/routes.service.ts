import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(
    private routing:Router
  ) { }

  homeRoute(){
    this.routing.navigate(['/home']);
  }

  loginRoute(){
    this.routing.navigate(['/login']);
  }
  signupRoute(){
    this.routing.navigate(['/signup']);
  }
  cartviewRoute(){
    this.routing.navigate(['/cart-view-page'])
  }
  registrationRoute(){
    this.routing.navigate(['/registration']);
  }
  profileRoute(){
    this.routing.navigate(['/profile']);
  }

  restaurantControlPanelRoute(id:string){
    this.routing.navigate([`/restaurant-control/${id}`])
  }

  restaurantControlRoute(){
    this.routing.navigate(['/restaurant-control'])
  }
  historyRoute(){
    this.routing.navigate(['/history-1'])
  }

  restaurantForCustomerRoute(id:string){
    this.routing.navigate([`/restaurant/${id}`])
  }

  registerRestaurantRoute(){
    this.routing.navigate(['/register-restaurant'])
  }
  restaurantListRoute(){
    this.routing.navigate(['/restaurant-list'])
  }
  restaurantLoginRoute(){
    this.routing.navigate(['/restaurant-login'])
  }
  imageUploaderRoute(){
    this.routing.navigate(['/image-uploader'])
  }
  restaurantsInCityRoute(city:string){
    
    this.routing.navigate([`/restaurants-in-city/${city as string}`])
  }


  favoritesPanelRoute(){
    this.routing.navigate([`/favorites-panel`])
  }



}
