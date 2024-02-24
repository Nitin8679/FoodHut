import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Order } from '../model/Order';
import { OrderStatus } from '../model/OrderStatus';
import { OrderService } from '../service/order.service';
import { PopupService } from '../service/popup.service';
import { forkJoin } from 'rxjs';
import { UserType } from '../model/UserType';


@Component({
  selector: 'app-restaurant-history',
  templateUrl: './restaurant-history.component.html',
  styleUrls: ['./restaurant-history.component.css']
})
export class RestaurantHistoryComponent  implements OnChanges{

  constructor(
    private popup:PopupService,
    private orderService:OrderService,

  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.lastChanges = changes;

    if (!this.restaurantId) {
      this.popup.openSnackBar("customer id not found");
      return;
    }
  
    // Create observables for each request
    const canceledOrders$ = this.orderService.getOrdersByStatusForRestaurant(OrderStatus.CANCELED, this.restaurantId);
    const rejectedOrders$ = this.orderService.getOrdersByStatusForRestaurant(OrderStatus.REJECTED, this.restaurantId);
    const completedOrders$ = this.orderService.getOrdersByStatusForRestaurant(OrderStatus.COMPLETED, this.restaurantId);
  
    // Use forkJoin to wait for all observables to complete
    forkJoin([canceledOrders$, rejectedOrders$, completedOrders$]).subscribe(
      ([canceledOrders, rejectedOrders, completedOrders]) => {
        // Code to execute after all three requests finish
        this.canceledOrders = canceledOrders || [];
        this.rejectedOrders = rejectedOrders || [];
        this.completedOrders = completedOrders || [];


        this.allHistory = [...canceledOrders, ...rejectedOrders , ... completedOrders];
        console.log(this.allHistory);
        
        this.restaurantHistory = [... this.allHistory]
      },
      (error) => {
        // Handle errors if needed
        console.error(error);
        this.popup.openSnackBar("Fetch failed");
      }
    );

  


  
  
  
  }


  
  @Input()
  restaurantId!:string;
  
  lastChanges:SimpleChanges;

  userType:string = UserType.RESTAURANT;
  
  canceledOrders:Order[] = [];
  completedOrders:Order[]= [];
  rejectedOrders:Order[] = [];
  
  allHistory!:Order[];


  restaurantHistory:Order[] = [];

  filterChips(status:string){
    switch (status){
      case "ALL":
        this.restaurantHistory = [];
        this.restaurantHistory = [...this.allHistory];
        break;
        case "COMPLETED":
          this.restaurantHistory = [];
          this.restaurantHistory = [...this.completedOrders];
          break;
      case "CANCELED":
        this.restaurantHistory = [];
        this.restaurantHistory = [...this.canceledOrders];
        break;
      case "REJECTED":
        this.restaurantHistory = [];
        this.restaurantHistory = [...this.rejectedOrders];
        break;
    
    }

  }

}
