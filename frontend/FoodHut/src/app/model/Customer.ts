import { Address } from "./Address";



export type Customer ={
    id?:string,
    name?:string,
    password?:string,
    contact?:string,
    address?:Address,
    status?:string,
    favoriteItems?:string[],
    favoriteRestaurants?:string[],
}