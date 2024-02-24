import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Order } from '../model/Order';
import { OrderStatus } from '../model/OrderStatus';
import { OrderService } from '../service/order.service';
import { PopupService } from '../service/popup.service';
import { UserType } from '../model/UserType';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnChanges{
  
  constructor( 
    private popup:PopupService,
    private orderService:OrderService,
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.lastChanges = changes;
    

    console.log("RestaurantOrdersComponent");
    if(!this.customerId){

      this.popup.openSnackBar("customer id not found");
      return;
    }

    //fetch processing orders
    this.orderService.getOrdersByStatusForCustomer( OrderStatus.PROCESSING  , this.customerId).subscribe(
      res=>{
        
        
        if(!res){
          
          this.popup.openSnackBar("fetch failed");
          return;
        }
        this.processingOrders = res;
      },
      err=>{

        console.log(err);
        
      }
      )
      
      
      //fetch confirmed orders
      this.orderService.getOrdersByStatusForCustomer( OrderStatus.CONFIRMED , this.customerId ).subscribe(
        res=>{
          if(!res){
            
            this.popup.openSnackBar("fetch failed");
            return;
          }


          this.confirmedOrders  = res;


        },
        err=>{
          
          console.log(err);
      }
    )
  
  }
  isOrdersEmpty(): boolean {
    return !this.processingOrders.length && !this.confirmedOrders.length;
  }


  @Input()
  customerId!:string;

  lastChanges:SimpleChanges;  

  processingOrders:Order[]= [];
  confirmedOrders:Order[]=[];
  userType = UserType.CUSTOMER;

  completeOrder(orderId:string){

    this.orderService.setOrderStatusForSingleOrder(  OrderStatus.COMPLETED  ,  orderId).subscribe(
      res=>{

        if(!res){
          return;
        }

        this.popup.openSnackBar("Delivery has been completed")
        this.ngOnChanges(this.lastChanges);
      },
      err=>{
        this.ngOnChanges(this.lastChanges);
        
        this.popup.openSnackBar("Delivery failure")
        console.log(err);
        
      }
      )

      
    }
    
    cancelOrder(orderId:string){
      this.orderService.setOrderStatusForSingleOrder( OrderStatus.CANCELED , orderId   ).subscribe(
        res=>{
          if(!res){
            return;
          }
          
          this.ngOnChanges(this.lastChanges);
          this.popup.openSnackBar("order has been canceled")
        },
        err=>{
        this.ngOnChanges(this.lastChanges);
        this.popup.openSnackBar("orer could not be cancelled")
        console.log(err);
      }
    )
  }

}
