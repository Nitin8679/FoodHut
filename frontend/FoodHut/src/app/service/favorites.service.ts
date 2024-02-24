import { Injectable } from '@angular/core';
import { Customer } from '../model/Customer';
import { Favorite } from '../model/Favorite';
import { RestaurantService } from './restaurant.service';
import { UserService } from './user.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(
    private userService:UserService,
    private restaurantService:RestaurantService,
  ) {


    // userService.getPopularityOf("RESTAURANT").subscribe(
    //   res=>{
    //     console.log(res);
        
    //   },
    //   err=>{
    //     console.log(err);

    //   }
    // )


    // restaurantService.getPopularCities().subscribe(
    //   res=>{
    //     if(!res){
    //       console.log(res);
        
    //       return;
    //     }
        
        
    //     this.popularCities = res;
    //     // console.log(res);
    //     console.log(this.popularCities);
        
        

    //   },
    //   err=>{
    //     console.log(err);
        
    //   }
    // )

   }


  allCustomers:Customer;
  favoriteRestaurants:Favorite[];
  favoriteItems:Favorite[];

  popularCities:Favorite[];


}
