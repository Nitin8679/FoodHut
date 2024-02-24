import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import items from 'razorpay/dist/types/items';
import { Item } from '../model/Item';
import { KeyType } from '../model/KeyType';
import { MenuService } from '../service/menu.service';
import { RestaurantService } from '../service/restaurant.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.css']
})
export class MenuPanelComponent implements OnInit, OnChanges{
  constructor(
    private restaurantService:RestaurantService,
    private menuService:MenuService,
    private tokenService:TokenService
  ){}
  
  ngOnInit(): void {


  }
  ngOnChanges(changes: SimpleChanges): void {
    
    if(this.restaurantId){
      this.menuService.getMenuForRestaurant(this.restaurantId).subscribe(
        res=>{
          // console.log(res);
          this.itemMenu = res;
          this._itemMenu = [...this.itemMenu];
          // console.log(this.menu);
          this.setUpCategories();
        },
        err=>{

        }
      )

    }
  }


  @Input()
  restaurantId!:string;

  itemMenu!:Item[];
  _itemMenu!:Item[];

  categories:Set<string>  = new Set();
  query:string;




  setUpCategories(){
    

    this._itemMenu.forEach(
      item=>{
        if(item.category){
          this.categories.add(item.category);
        }
      }
    )

  }




  searchItems(event:any){

    // console.log(this.query);

    if(this.query ===''){
      this.itemMenu = [];
      this.itemMenu = [...this._itemMenu]
  
      return;
    }

    this.itemMenu = [];
    this.itemMenu = [...this._itemMenu]

    const filteredItems:Item[] = this.itemMenu.filter( item=>{
      return item.name?.toLocaleLowerCase().startsWith( this.query.toLowerCase() )
    } );
    // console.log( filteredItems );

    this.itemMenu = []
    this.itemMenu = [...filteredItems]
    
  }
  sortByCategory(category:string){
    if(category.match('ALL')){

      this.itemMenu = [];
      this.itemMenu = [...this._itemMenu]
  
      return;
    }

    // console.log(category);

    this.itemMenu = [];
    this.itemMenu = [...this._itemMenu]

    const filteredItems:Item[] = this.itemMenu.filter(
      item=>{
        return item.category?.match(  category );
      }
    )

    this.itemMenu = []
    this.itemMenu = [... filteredItems];
    
  }
  sortByPrice(order:number){
    // use 1 for ascending or -1 for descending.

    const sortedItems = [... this.itemMenu ];
    sortedItems.sort(
      (a,b)=>{
        const p1 = a.price;
        const p2 = b.price;

        return (p1-p2) *order
      }
    )
    
    this.itemMenu  = [];
    this.itemMenu = [...sortedItems];
  }
  sortByPopularity(){

  }

  clear(){
    if(this.query ==''){
      // this.sendQuery()
      this.itemMenu = [];
      this.itemMenu = [...this._itemMenu];
    }
  }





}
