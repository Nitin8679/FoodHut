import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { randomCities } from '../model/AddressList';
import { Customer } from '../model/Customer';
import { Favorite } from '../model/Favorite';
import { KeyType } from '../model/KeyType';
import { FavoritesService } from '../service/favorites.service';
import { RestaurantService } from '../service/restaurant.service';
import { RoutesService } from '../service/routes.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit,OnChanges{

  constructor(
    private routes:RoutesService,
    private tokenService:TokenService,
    private restaurantService:RestaurantService,
    private routesService:RoutesService,
    private favoritesService:FavoritesService,
  ){}

  ngOnInit(): void {

    
   
    
    
    this.restaurantService.getPopularCities().subscribe(
      res=>{

        if(!res){
          return;
        }

     
        this.mostPopularLocations  = Object.keys( res );


      },
      err=>{

        console.log(err);
        
      }
    )
    
    
    // console.log(this.mostPopularLocations);
    
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    

    
  }

  

  
  

  goToRestaurant(id:string){
    this.routes.restaurantForCustomerRoute(id);
  }
  mostPopularLocations:String[];


  cityClicked(city:String){

    this.routesService.restaurantsInCityRoute(city as string);
  }
  


}
