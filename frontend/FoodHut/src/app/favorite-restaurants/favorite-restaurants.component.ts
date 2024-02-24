import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Restaurant } from '../model/Restaurant';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-favorite-restaurants',
  templateUrl: './favorite-restaurants.component.html',
  styleUrls: ['./favorite-restaurants.component.css']
})
export class FavoriteRestaurantsComponent implements OnInit, OnChanges{
  constructor(

    private restaurantService:RestaurantService
  ){}
  
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    
    
    if(this.favorites){

      this.restaurantService.getRestaurantsByIds( this.favorites ).subscribe(
        res=>{
          // console.log(res);
          this.favoriteRestaurants = res;
          
        },
        err=>{
          console.log(err);
          
        }
      )
    }

    
  }

  @Input()
  customerId:string;

  @Input()
  favorites:string[];

  favoriteRestaurants:Restaurant[];

  



}
