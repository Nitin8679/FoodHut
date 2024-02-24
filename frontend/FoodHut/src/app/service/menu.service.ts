import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../model/Item';
import { Connection } from './Connection';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http:HttpClient
  ) { }

  menuUrl:string = `${Connection.baseUrl}/restaurant-service/menu`;


  addItemToMenu(item:Item):Observable<Item>{
    return this.http.post<Item>( `${this.menuUrl}/add`, item );
  }
  getMenuForRestaurant(restaurantId:string):Observable<Item[]>{
    return this.http.get<Item[]>(  `${this.menuUrl}/${restaurantId}` ); 
  }
  updateItem(item:Item):Observable<Item>{
    return this.http.put<Item>( `${this.menuUrl}/update` ,item);
  }
  deleteItem(itemId:string):Observable<any>{
    return this.http.delete<any>( `${this.menuUrl}/delete/${itemId}` );
  }
  getItemsByIds(itemIds:string[]):Observable<Item[]>{
    return this.http.post<Item[]>( `${this.menuUrl}/items`, itemIds   );
  }
  getItemById(itemId:string):Observable<Item>{
    return this.http.get<Item>( `${this.menuUrl}/item/${itemId}` );
  }


}
