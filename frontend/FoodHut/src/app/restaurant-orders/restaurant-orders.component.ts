import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Order } from '../model/Order';
import { OrderStatus } from '../model/OrderStatus';
import { UserType } from '../model/UserType';
import { OrderService } from '../service/order.service';
import { PopupService } from '../service/popup.service';

@Component({
  selector: 'app-restaurant-orders',
  templateUrl: './restaurant-orders.component.html',
  styleUrls: ['./restaurant-orders.component.css']
})
export class RestaurantOrdersComponent  implements OnInit,OnChanges{

  constructor( 
    private popup:PopupService,
    private orderService:OrderService,
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.lastChanges = changes;
    

    console.log("RestaurantOrdersComponent");
    if(!this.restaurantId){

      this.popup.openSnackBar("restaurant id not found");
      return;
    }

    //get processing orders
    this.orderService.getOrdersByStatusForRestaurant( OrderStatus.PROCESSING as string , this.restaurantId).subscribe(
      res=>{
        // console.log(res);
        console.log(res);
        
        if(!res){
          this.processingOrders = [];
          return;
        }
        
        this.processingOrders =  res;
        
      },
      err=>{
        
        this.processingOrders = [];
        this.popup.openSnackBar("getting orders failed")
      }
      );
      
      //get confirmed orders
      this.orderService.getOrdersByStatusForRestaurant( OrderStatus.CONFIRMED as string , this.restaurantId ).subscribe(
        res=>{
          console.log(res);
          if(!res){
            this.confirmedOrders = [];
            return;
          }
          
          
          this.confirmedOrders= res;
          
          
        },
        err=>{
          
          this.confirmedOrders= [];
          this.popup.openSnackBar("getting orders failed")
      }
    )
    



  
  }
  
  ngOnInit(): void {
    
  }


  @Input()
  restaurantId!:string;
  lastChanges:SimpleChanges;

  processingOrders:Order[];
  confirmedOrders:Order[];
  userType = UserType.RESTAURANT;



  confirm(orderId:string){
    this.orderService.setOrderStatusForSingleOrder(OrderStatus.CONFIRMED , orderId   ).subscribe(
      res=>{

        console.log(res);
        this.popup.openSnackBar("Order has been Confirmed");
        this.ngOnChanges(this.lastChanges);
      },
      err=>{
        this.popup.openSnackBar("confirmation failure");
        this.ngOnChanges(this.lastChanges);

      }
    )
  }
  reject(orderId:string){
    this.orderService.setOrderStatusForSingleOrder(OrderStatus.REJECTED,orderId).subscribe(
      res=>{
        console.log(res);
        this.popup.openSnackBar("Order has been Rejected");
        this.ngOnChanges(this.lastChanges);
      },
      err=>{
        this.popup.openSnackBar("failure");
        this.ngOnChanges(this.lastChanges);
      }
    )
  }



  


}
