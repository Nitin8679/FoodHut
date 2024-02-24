import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delivery } from '../model/Delivery';
import { Order } from '../model/Order';
import { Connection } from './Connection';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http:HttpClient
  ) { }

  orderUrl = `${Connection.baseUrl}/order-service`;
  
  getCart(token:string):Observable<Order[]>{
    
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<Order[]>( `${this.orderUrl}/cart/get` ,{headers:hdr} );
  }


  getCartForCustomer(customerId:string):Observable<Order[]>{
    return this.http.get<Order[]>(`${this.orderUrl}/cart/${customerId}`);
  }
  addOrderToCart(order:Order):Observable<Order>{
    return this.http.post( `${this.orderUrl}/cart/add` , order );
  }






  removeOrderFromCart(orderId:string):Observable<Response>{
    return this.http.delete<Response>(`${this.orderUrl}/cart/remove/${orderId}`)
  }

  processOrders(orders:string[]):Observable<Order[]>{

    return this.http.post<Order[]>( `${this.orderUrl}/cart/process-orders`,orders );
  }

  setOrderStatusForMultipleOrders(orderStatus:string, orderIds:string[]):Observable<Order>{
    return this.http.post<Order>( `${this.orderUrl}/set/${orderStatus}`,orderIds );
  }

  setOrderStatusForSingleOrder(orderStatus: string, orderId: string): Observable<Order> {
    const url = `${this.orderUrl}/set/${orderStatus}/${orderId}`;
    return this.http.get<Order>(url);
  }

  getOrdersByStatusForRestaurant(status: string, restaurantId: string): Observable<Order[]> {
    const url = `${this.orderUrl}/restaurant/get/${status}/${restaurantId}`;
    return this.http.get<Order[]>(url);
  }

  getOrdersByStatusForCustomer(status: string, customerId: string): Observable<Order[]> {
    const url = `${this.orderUrl}/customer/get/${status}/${customerId}`;
    return this.http.get<Order[]>(url);
  }



  updateOrderInCustomerCart(order: Order): Observable<Order> {
    const url = `${this.orderUrl}/cart/update`;

    // Make an HTTP PUT request to update the order
    return this.http.put<Order>(url, order);
  }

  //utility

  getCustomerIds(orders:Order[]):string[]{

    return orders
      .filter((order) => order.customerId)
      .map((order) => order.customerId as string);

  }
  getRestaurantIds(orders:Order[]):string[]{

    return orders
    .filter((order) => order.restaurantId)
    .map((order) => order.restaurantId as string);
  }


}
