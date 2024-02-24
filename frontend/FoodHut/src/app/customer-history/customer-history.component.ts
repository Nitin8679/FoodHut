import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Order } from '../model/Order';
import { OrderStatus } from '../model/OrderStatus';
import { OrderService } from '../service/order.service';
import { PopupService } from '../service/popup.service';
import { forkJoin } from 'rxjs';
import { UserType } from '../model/UserType';
@Component({
  selector: 'app-customer-history',
  templateUrl: './customer-history.component.html',
  styleUrls: ['./customer-history.component.css']
})
export class CustomerHistoryComponent implements OnChanges{


  constructor(
    private popup:PopupService,
    private orderService:OrderService,

  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.lastChanges = changes;

    if (!this.customerId) {
      this.popup.openSnackBar("customer id not found");
      return;
    }
  
    // Create observables for each request
    const canceledOrders$ = this.orderService.getOrdersByStatusForCustomer(OrderStatus.CANCELED, this.customerId);
    const rejectedOrders$ = this.orderService.getOrdersByStatusForCustomer(OrderStatus.REJECTED, this.customerId);
    const completedOrders$ = this.orderService.getOrdersByStatusForCustomer(OrderStatus.COMPLETED, this.customerId);
  
    // Use forkJoin to wait for all observables to complete
    forkJoin([canceledOrders$, rejectedOrders$, completedOrders$]).subscribe(
      ([canceledOrders, rejectedOrders, completedOrders]) => {
        // Code to execute after all three requests finish
        this.canceledOrders = canceledOrders || [];
        this.rejectedOrders = rejectedOrders || [];
        this.completedOrders = completedOrders || [];


        this.allHistory = [...canceledOrders, ...rejectedOrders , ...completedOrders];
        this._allHistory = [...this.allHistory];
        console.log(this.allHistory);
        
        this.customerHistory = [... this.allHistory]
      },
      (error) => {
        // Handle errors if needed
        console.error(error);
        this.popup.openSnackBar("Fetch failed");
      }
    );

  


  
  
  
  }


  
  @Input()
  customerId!:string;
  

  total:number = 0;

  lastChanges:SimpleChanges;


  
  canceledOrders:Order[] = [];
  completedOrders:Order[]= [];
  rejectedOrders:Order[] = [];
  
  allHistory!:Order[];
  _allHistory!:Order[];

  userType = UserType.CUSTOMER;

  customerHistory:Order[] = [];


  filterChips(status:string){
    console.log(
      status
    );
    
    switch (status){
      case "ALL":
        
        this.customerHistory = [];
        this.customerHistory = [...this.allHistory];
        break;
      case "COMPLETED":
          this.customerHistory = [];
          this.customerHistory = [...this.completedOrders];
          break;
      case "CANCELED":
        this.customerHistory = [];
        this.customerHistory = [...this.canceledOrders];
        break;
      case "REJECTED":
        this.customerHistory = [];
        this.customerHistory = [...this.rejectedOrders];
        break;
    
    }

  }

  setTotal(num:number){
    this.total = num;
  }
}
