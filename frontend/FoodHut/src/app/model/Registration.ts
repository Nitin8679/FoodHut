import { Address } from "./Address"

export type Registration = {
       id?:string,
       name?:string,
       contact?:string,
       password?:string,
       address?:Address,
}