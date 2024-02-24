import { Item } from "./Item";

export type Order={
    id?:string,
    customerId?:string,
    restaurantId?:string,
    itemId?:string,
    amount?:number,
    // deliveryId?:string,
    status?:Item
    
}