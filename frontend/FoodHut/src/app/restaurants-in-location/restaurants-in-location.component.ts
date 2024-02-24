import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Customer } from '../model/Customer';
import { Restaurant } from '../model/Restaurant';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-restaurants-in-location',
  templateUrl: './restaurants-in-location.component.html',
  styleUrls: ['./restaurants-in-location.component.css']
})
export class RestaurantsInLocationComponent implements OnInit,OnChanges{

  constructor(
    private restaurantService:RestaurantService,
  ){}

    ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.city);
  

    if(this.city){
      this.restaurantService.getRestaurantByCity(this.city).subscribe(
        res=>{
          // console.log(res);
          
          this.restaurantsInLocation = res;
        },
        err=>{
          console.log(err);
        }
      )
    }
  
  }
  ngOnInit(): void {
    
  }

  // @Input()
  // location!:String;
  
  @Input()
  city!:string;
  
  restaurantsInLocation:Restaurant[];
  

  // @Input()
  // currentUser!:Customer;

}
