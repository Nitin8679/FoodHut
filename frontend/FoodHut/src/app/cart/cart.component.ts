import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from '../model/Item';
import { Order } from '../model/Order';
import { OrderStatus } from '../model/OrderStatus';
import { MenuService } from '../service/menu.service';
import { OrderService } from '../service/order.service';
import { PopupService } from '../service/popup.service';
import { RestaurantService } from '../service/restaurant.service';
import { RazorpayService } from '../service/razorpay.service';

import anime from 'animejs/lib/anime.es.js';
import { CartService } from '../service/cart.service';
declare var Razorpay: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,OnChanges{
  isRazorpay:boolean=false;
  constructor(
    private orderService:OrderService,
    private menuService:MenuService,
    private restaurantService:RestaurantService,    
    private popupService:PopupService,
    private razorpayService:RazorpayService,
    private cartService:CartService
  ){}

  ngOnInit(): void {
    console.log('Cart component initialized');
   
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    
    this.lastChanges = changes;
    // console.log(this.customerId);
   
    console.log('Cart component changed:', changes);
    this.orderService.getCartForCustomer(this.customerId).subscribe(
      res=>{
        // console.log(res);
        this.orders = res;
      
        // console.log(this.orders);
        
        const itemids = this.createItemIdList( this.orders );
        // console.log(itemids);
        this.menuService.getItemsByIds(itemids).subscribe(
          res=>{
            // console.log(res);
            this.items = res;
            
            this.subtotal =  this.calculateTotal(this.orders, this.items );
            
            console.log(this.subtotal);
            
          },
          err=>{
            console.log(err);
            
          }
          )
        
        
          this.totalAmount = this.calculateTotalAmount(this.orders);
          console.log(this.totalAmount);
          

      },
      err=>{
        console.log(err);
        this.orders =[];
        this.totalAmount =0;
        this.subtotal =0;
        
        
      }
    )

  }

  @Input()
  customerId!:string;


  lastChanges:SimpleChanges;

  orders:Order[]=[];
  items:Item[]=[];
  subtotal:number;
  totalAmount:number;

  isCartEmpty(): boolean {
    return this.orders ? this.orders.length === 0 : true;
  }
  
  remove(orderId:string){
    console.log(orderId);
    
    this.orderService.removeOrderFromCart(orderId).subscribe(
      res=>{
        console.log(res);
        
        console.log("response");
        this.popupService.openSnackBar("removed from cart");
        this.cartService.isChanged=true;
        this.ngOnChanges(this.lastChanges);
      },
      err=>{
        console.log("error");
        
        console.log(err);
        
        this.popupService.openSnackBar("failed to remove");
        this.ngOnChanges(this.lastChanges);

      }
    )
  }
  proceedToBuy(){


   
    
    // if(!this.orders){
    //   this.popupService.openSnackBar("there no orders in cart");
    //   return;
    // }
    
    
    // const orderIds = this.createListOfOrderIds( this.orders );
    // if(!orderIds || orderIds.length ===0){
    //   this.popupService.openSnackBar("id generation failure");
      
    //   return;
    // }

    // // this.orderService.processOrders(  orderIds  ).subscribe(
    // //   res=>{
    // //     console.log("res");
    // //     console.log(res);
    // //     this.ngOnChanges(this.lastChanges);
    // //   },
    // //   err=>{
    // //     console.log("err");
        
    // //     console.log(err);
    // //     this.ngOnChanges(this.lastChanges);
        
    // //   }
    // // );


    // this.popupService.openCofirmationDialog(`Total Price: ${this.subtotal}`).subscribe(
    //   res=>{
    //     if(res){
    //       console.log(this.totalAmount);

          const options: any = {
            key: 'rzp_test_NKe55hNeyjMa8Q',
            amount: this.subtotal*100, 
            currency: 'INR',
            name: 'FoodHut',
            description: 'Food Order',
            modal: {
              // We should prevent closing of the form when esc key is pressed.
              escape: false,
            },
            // Add other necessary options
          };
          options.handler = (response: any, error: any) => {
            if(error){
              console.log("error while payment");
            }
            else{
              console.log("payment successful")
              const orderIds = this.createListOfOrderIds(this.orders);
              this.orderService.setOrderStatusForMultipleOrders(OrderStatus.PROCESSING, orderIds).subscribe(
                res => {
                  console.log(res);
                  this.popupService.openSnackBar("Transaction Successfully!");
                  this.cartService.isChanged=true;
                  this.ngOnChanges(this.lastChanges);
                },
                err => {
                  console.log(err);
                  this.popupService.openSnackBar("Transaction Failed!");
                  this.ngOnChanges(this.lastChanges);
                }
              );
            }
            
          }
          options.modal.ondismiss = () => {
            // handle the case when user closes the form while transaction is in progress
            this.popupService.openSnackBar("Transaction Failed!");
            
          };
          const rzp = new this.razorpayService.nativeWindow.Razorpay(options);
          rzp.open();
          
          
    //       this.orderService.setOrderStatusForMultipleOrders( OrderStatus.PROCESSING  ,orderIds ).subscribe(
    //         res=>{
      
    //           console.log(res);
           
    //           this.popupService.openSnackBar("Transaction Successfully!")
    //           this.ngOnChanges(this.lastChanges);
    //         },
    //         err=>{
    //           console.log(err);
              
    //           this.popupService.openSnackBar("Transaction Failed!")
    //           this.ngOnChanges(this.lastChanges);
    //         }
    //       )
    //         // this.isRazorpay=false;
          
    //     }
    //     else{
    //       this.popupService.openSnackBar("Transaction rejected by customer");
    //     }
    //   },
    //   err=>{
    



  }












  //utility
  createListOfOrderIds(orders:Order[]):string[]{
    
    const orderIds:string[] = [];
    if(!orders || orders.length === 0){
      return  [];
    }

    for(const order of orders){
      orderIds.push(  order.id )
    }
    return orderIds;
  }

  createItemIdList(orders: Order[]): string[] {
    const itemIds: string[] = [];
  
    for (const order of orders) {
      // Assuming itemId is a string, modify accordingly if it's a different type
      const itemId: string = order.itemId;
  
      // Check if the itemId is not already in the list to avoid duplicates
      if (!itemIds.includes(itemId)) {
        itemIds.push(itemId);
      }
    }
  
    return itemIds;
  }

  calculateTotal(orders: Order[], items: Item[]): number {
    let totalCost = 0;

    if(orders.length===0){
      return 0;
    }
    for (const order of orders) {
        const { itemId, amount } = order;
        const item = items.find(i => i.id === itemId);

        if (item) {
            totalCost += item.price * (amount || 1); // Default amount to 1 if not specified
        }
    }

    return totalCost;
}
updateQuantity(order: Order, increment: number) {
  order.amount += increment;
  // Ensure the quantity stays within the min and max limits (1 and 10)
  order.amount = Math.min(Math.max(order.amount, 1), 10);
}


updateOrder(order: Order) {
  // Calculate updated total for the order
  // const updatedTotal = order.amount * order.amount;

  // Update order in backend through API call
  this.orderService.updateOrderInCustomerCart(order).subscribe(
    (updatedOrder: Order) => {
      // Update the order in the local list with the updated amount and total
      order = updatedOrder;
      // Recalculate the subtotal and totalAmount based on the updated orders
      this.updateCartData();
      this.popupService.openSnackBar('Order updated successfully!');
    },
    (error) => {
      console.error('Failed to update order:', error);
      this.popupService.openSnackBar('Failed to update order!');
    }
  );
} updateCartData() {
  if (this.orders && this.items) {
    this.subtotal = this.calculateTotal(this.orders, this.items);
    this.totalAmount = this.calculateTotalAmount(this.orders);
  }
}


  calculateTotalAmount(orders:Order[]):number{ 

    let totalAmount =0;

    if(orders.length===0){
      return 0;
    }
    for(const order of orders){
      totalAmount +=order.amount;
    }
    return totalAmount;
  }
  
}

