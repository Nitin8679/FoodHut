import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorite } from '../model/Favorite';
import { Order } from '../model/Order';
import { Restaurant } from '../model/Restaurant';
import { Connection } from './Connection';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    private http:HttpClient,
    private token:TokenService
  ) { }

  
  baseUrl=Connection.baseUrl;
  restaurantUrl = `${this.baseUrl}/restaurant-service`;
  
  serve(){
    return this.http.get(`${this.restaurantUrl}/serve`);
  }

  getAllRestaurants():Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>( `${this.restaurantUrl}/restaurant/all`);
  }

  registerRestaurant(restaurant:Restaurant):Observable<Restaurant>{
    return this.http.post<Restaurant>( `${this.restaurantUrl}/restaurant/register`, restaurant ); 
  
  }

  getRestaurantsForUser(token:string):Observable<Restaurant[]>{
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<Restaurant[]>(`${this.restaurantUrl}/restaurant/all/user`, {headers:hdr} );
  }
  getRestaurant(restaurantId:string):Observable<Restaurant>{
    return this.http.get( `${this.restaurantUrl}/restaurant/${restaurantId}` );
  }
  updateRestaurant(restaurant:Restaurant):Observable<Restaurant>{
    return this.http.put<Restaurant>(`${this.restaurantUrl}/restaurant/update`,restaurant);
  }
  removeRestaurant(restaurantId:string):Observable<any>{
    return this.http.delete(`${this.restaurantUrl}/restaurant/remove/${restaurantId}`);
  }
  getRestaurantByState(state:string):Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>(`${this.restaurantUrl}/restaurant/state/${state}`);
  }
  getRestaurantByCity(city:string):Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>(`${this.restaurantUrl}/restaurant/city/${city}`);
  }
  getRestaurantHistory(restaurantId:string):Observable<Order[]>{
    return this.http.get<Order[]>(`${this.restaurantUrl}/history/restaurant/${restaurantId}`);
  }

  getRestaurantsByIds(restaurantIds:string[]):Observable<Restaurant[]>{
    return this.http.post<Restaurant[]>( `${this.restaurantUrl}/restaurant/get/byId`,restaurantIds );
  }

  getPopularCities():Observable<Favorite>{
    return this.http.get<Favorite>( `${this.restaurantUrl}/popular/city` );
  }

}
