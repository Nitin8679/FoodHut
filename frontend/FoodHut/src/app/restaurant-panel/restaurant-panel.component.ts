import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../model/Restaurant';
import { ImageService } from '../service/image.service';
import { PopupService } from '../service/popup.service';
import { RestaurantService } from '../service/restaurant.service';
import { RoutesService } from '../service/routes.service';

@Component({
  selector: 'app-restaurant-panel',
  templateUrl: './restaurant-panel.component.html',
  styleUrls: ['./restaurant-panel.component.css']
})
export class RestaurantPanelComponent implements OnInit{
  constructor(
    private  activatedRoute:ActivatedRoute,
    private restaurantService:RestaurantService,
    private routesService:RoutesService,
    private popupService:PopupService,
    private imageService:ImageService
  ){}


  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      res=>{
        const id = res.get('id');
        if(id){
          this.restaurantId = id; 
        

        }

        
      },
      err=>{
        console.log("no params");
        
      }
    )

    this.initialization.subscribe(
      res=>{
        // console.log("init complete");
        
        
      },
      err=>{

      }
    )



  }

  
  initialization = new EventEmitter();

  restaurant:Restaurant ={};
  restaurantId:string="";







  listBtn(){
    this.routesService.restaurantListRoute();
  }

  click(){
    this.popupService.openSnackBar("CLICKED")
  }

}
