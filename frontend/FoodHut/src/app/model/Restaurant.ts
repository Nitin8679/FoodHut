import { Address } from "./Address"
import { Owner } from "./Owner"


export type Restaurant = {
    id?:string,
    name?:string,
    contact?:string,
    userId?:string,
    cuisineType?:string,
    description?:string,
    rating?:number,
    owner?:Owner,
    address?:Address,
}