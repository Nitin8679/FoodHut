import { Component, OnInit } from '@angular/core';
import { DecodedTokenObject } from '../model/DecodedTokenObject';
import { KeyType } from '../model/KeyType';
import { Restaurant } from '../model/Restaurant';
import { PopupService } from '../service/popup.service';
import { RestaurantService } from '../service/restaurant.service';
import { RoutesService } from '../service/routes.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent  implements OnInit {

  constructor(
    private routing:RoutesService,
    private  restaurantService:RestaurantService,
    private tokenService:TokenService,
    private  popupService:PopupService
  ){}


  ngOnInit(): void {

    this.authToken = this.tokenService.getToken(KeyType.AUTH_TOKEN);
    if(this.authToken== null){
      this.popupService.openSnackBar("not logged in");
      return;
    }

    // console.log( this.tokenService.decodeToken( this.authToken  ) );
    
    // const decodedToken:DecodedTokenObject = this.tokenService.decodeToken( this.authToken );
    
    this.restaurantService.getRestaurantsForUser( this.authToken ).subscribe(
      res=>{
        
        // console.log(res);
        

        this.restaurants = [... res];

      },
      err=>{

      }
    )
  }
  authToken:string | null = null;
  restaurants:Restaurant[]= [];


  navigateToRestaurant(id:string){
    // console.log("restaurant");
    
    this.routing.restaurantControlPanelRoute(id);
  }


  

}
