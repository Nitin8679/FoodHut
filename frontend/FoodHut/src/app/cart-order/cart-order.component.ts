import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from '../model/Item';
import { Order } from '../model/Order';
import { Restaurant } from '../model/Restaurant';
import { MenuService } from '../service/menu.service';
import { PopupService } from '../service/popup.service';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-cart-order',
  templateUrl: './cart-order.component.html',
  styleUrls: ['./cart-order.component.css']
})
export class CartOrderComponent implements OnInit,OnChanges{

  constructor(
    private restaurantService:RestaurantService,
    private menuService:MenuService,
    private popupService:PopupService
  ){}


  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.order);
    
    if(this.order){

      //get restaurant
      this.restaurantService.getRestaurant(this.order.restaurantId ).subscribe(
        res=>{
          // console.log(res);
          this.restaurant = res as Restaurant;
        },
        err=>{
          console.log(err);
          this.popupService.openSnackBar("restaurant not found");
          
        }
      )
      //get item;
      this.menuService.getItemById( this.order.itemId ).subscribe(
        res=>{
          this.item = res as Item
          // console.log(res);
          
        },
        err=>{
          console.log(err);
          this.popupService.openSnackBar("item not found");
        }
      )

    }

  }

  @Input()
  order!:Order;

  item!:Item;
  restaurant!:Restaurant;

}
