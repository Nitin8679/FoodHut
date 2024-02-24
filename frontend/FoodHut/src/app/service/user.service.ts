import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse} from '../model/AuthResponse';
import { Customer } from '../model/Customer';
import { TokenService } from './token.service';
import { AuthRequest } from '../model/AuthRequest';
import { Connection } from './Connection';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient,
    private  tokenService:TokenService
  ) { }

  baseUrl= Connection.baseUrl;
  customerUrl = `${this.baseUrl}/api/v1/customer` ;
  authUrl=`${this.baseUrl}/api/auth`;


  getAllCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.customerUrl}/all`);
  }

  customerAuthLogin(authRequest:AuthRequest):Observable<AuthResponse>{

    return this.http.post<AuthResponse>( `${this.customerUrl}/login`,authRequest);
  }
  authLogin(request:any){
    return this.http.post<any>(this.authUrl+"/login",request);
  }
  checkOTP(num:number,request:any){
    return this.http.post<AuthResponse>(this.authUrl+"/checkOTP/"+num,request);
  }
  getOTP(request:any){
    return this.http.post<any>(this.authUrl+"/getOTP",request);
  }
  customerRegister(registration:Customer):Observable<Customer>{
    return this.http.post<Customer>(`${this.customerUrl}/register`, registration);
  }
  getCustomerDetails(token:string):Observable<Customer>{


    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<Customer>(`${this.customerUrl}/details`, {headers:hdr});

  }
  editAccount(customer:Customer):Observable<Customer>{
    return this.http.put<Customer>(  `${this.customerUrl}/edit` , customer );
  }

  getCustomerById(customerId:string):Observable<Customer>{
    return this.http.get( `${this.customerUrl}/get/${customerId}`  );
  }


  //favorites

  addFavoriteRestaurant(restaurantId:string, customerId:string):Observable<string[]>{
    return this.http.get<string[]>(`${this.customerUrl}/favorite/restaurant/add/${customerId}/${restaurantId}`);

  }
  removeFavoriteResaurant(restaurantId:string, customerId:string){
    return this.http.delete<string[]>(`${this.customerUrl}/favorite/restaurant/remove/${customerId}/${restaurantId}`);

  }

  addFavoriteitem(itemId:string ,customerId:string){
    return this.http.get<string[]>(`${this.customerUrl}/favorite/item/add/${customerId}/${itemId}`)
  }

  removeFavoriteItem(itemId:string, customerId:string){
    return this.http.delete<string[]>(`${this.customerUrl}/favorite/item/remove/${customerId}/${itemId}`)
  }

  //popularity
  getPopularityOf(type:string):Observable<any>{
    return this.http.get<any>( `${this.customerUrl}/favorite/get/${type}` );
  }

}
