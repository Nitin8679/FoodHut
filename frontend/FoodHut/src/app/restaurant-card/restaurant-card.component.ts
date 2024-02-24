import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Restaurant } from '../model/Restaurant';
import { ImageService } from '../service/image.service';
import { RoutesService } from '../service/routes.service';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent implements OnInit , OnChanges{
  constructor(
    private imageService:ImageService,
    private routesService:RoutesService,
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if(this.restaurant){

      this.imageService.downloadAssociatedImage( this.restaurant.id ).subscribe(
        res=>{
          this.imageUrl = res;
        },
        err=>{
          console.log(err);
          
        }
      )



    }
    
  }
  ngOnInit(): void {
  
  }

  @Input()
  restaurant!:Restaurant;

  imageUrl: string | ArrayBuffer | null = '';


  goToRestaurant(id:string){
    this.routesService.restaurantForCustomerRoute(id);
  }
}
