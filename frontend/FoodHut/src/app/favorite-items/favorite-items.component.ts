import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from '../model/Item';
import { MenuService } from '../service/menu.service';
import { RoutesService } from '../service/routes.service';

@Component({
  selector: 'app-favorite-items',
  templateUrl: './favorite-items.component.html',
  styleUrls: ['./favorite-items.component.css']
})
export class FavoriteItemsComponent implements OnInit, OnChanges{

  constructor(
    private menuService:MenuService,
    private routesService:RoutesService,
  ){}

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {

    if(this.favorites){
      this.menuService.getItemsByIds(this.favorites).subscribe(
        res=>{
          this.favoriteItems = res;
          // console.log(this.favoriteItems);
          
        },
        err=>{
          console.log(err);
          

        }
      )
    }
  }
  @Input()
  favorites:string[];

  favoriteItems:Item[];

  navigateToRestaurant(restaurantId:string){
    this.routesService.restaurantForCustomerRoute(restaurantId);
    
  }

}
