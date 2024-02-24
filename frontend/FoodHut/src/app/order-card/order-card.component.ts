import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Customer } from '../model/Customer';
import { Item } from '../model/Item';
import { ItemStatus } from '../model/Itemstatus';
import { Order } from '../model/Order';
import { AccountStaus } from '../model/AccountStatus';
import { Restaurant } from '../model/Restaurant';
import { MenuService } from '../service/menu.service';
import { OrderService } from '../service/order.service';
import { PopupService } from '../service/popup.service';
import { RestaurantService } from '../service/restaurant.service';
import { UserService } from '../service/user.service';
import { UserType } from '../model/UserType';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit,OnChanges{

  constructor(
    private popup:PopupService,
    private orderService:OrderService,
    private menuService:MenuService,
    private userService:UserService,
    private restaurantService:RestaurantService,
  ){}

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
  
    // console.log("order-card");
    
    if(!this.order){
      return;
    }


    this.menuService.getItemById(this.order.itemId).subscribe(
      res=>{

        if(!res){
          this.item ={
            status:ItemStatus.REMOVED
          }
          console.log("fetch failed");
          return;
        }
        
        this.item = res;
      },
      err=>{
        console.log(err);
        this.item ={
          status:ItemStatus.REMOVED
        }
      }
      )


      switch (this.from){
        case UserType.RESTAURANT:
          this.userService.getCustomerById( this.order.customerId ).subscribe(
            res=>{
      
              
              if(!res){
                this.customer = {
                  status: AccountStaus.INACTIVE
                }
                console.log("fetch failed");
                return;
              }
      
      
              this.customer =  res;
      
      
            },
            err=>{
              console.log(err);
              
              this.customer = {
                status: AccountStaus.INACTIVE
              }
              
            }
          )
          break;
        case UserType.CUSTOMER:
          this.restaurantService.getRestaurant(this.order.restaurantId).subscribe(
            res=>{
              if(!res){
                console.log(res);
                
                return;
              }


              this.restaurant  = res;

            },
            err=>{

              console.log(err);
              
            }
          )
          break;

        default:
          this.restaurant = {};
          this.customer = {};

      }



      
      
      
  }
      
      @Input()
      order!:Order;

      @Input()
      from:string = '';

      fromType = UserType;

      @Output()
      data = new EventEmitter();
      
      item!:Item;
      customer!:Customer;
      restaurant!:Restaurant;


}
