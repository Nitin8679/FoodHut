import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Order } from '../model/Order';
import { KeyType } from '../model/KeyType';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit,OnChanges {
  cart:Order[]=[];
  length:number=0;
  isChanged:boolean=false;
  orderURL:string="http://localhost:9999/order-service";
  constructor(private httpClient:HttpClient) {
     this.getCart(); 
      console.log(this.cart);
      
   }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  ngOnInit(): void {
    
  }
  
  getCartSize(){
      // this.httpClient.get(this.orderURL+)
      if(this.isChanged){
        this.getCart();
        this.isChanged=false;
        return this.cart.length;
      }
      else{
        return this.cart.length;
      }
  }
  getCart(){
    console.log(localStorage.getItem(KeyType.AUTH_TOKEN));
    const token=localStorage.getItem(KeyType.AUTH_TOKEN);
    this.httpClient.get<Order[]>(this.orderURL+"/getCartByCustomer",{headers:new HttpHeaders({
      "Content-Type":"application/json",
      "Authorization":"Bearer "+token
    })}).subscribe(
        success=>{
          this.cart=success;
          this.length=this.cart.length;
        },
        failure=>{
          console.log(failure);
        }
    )
  }
}
