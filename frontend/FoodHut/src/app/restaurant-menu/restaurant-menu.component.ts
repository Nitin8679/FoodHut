import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Item } from '../model/Item';
import { MenuService } from '../service/menu.service';
import { PopupService } from '../service/popup.service';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent  implements OnInit{

  constructor(
    private popupService:PopupService,
    private menuService:MenuService
  ){}

  ngOnInit(): void {

    console.log("RestaurantMenuComponent");

    

    if(!this.restaurantId){
      this.popupService.openSnackBar("restaurant does not exist")
      return;
    }

    this.menuService.getMenuForRestaurant( this.restaurantId ).subscribe(
      res=>{

        if(!res){
          this.menu = [];
          return;
        }


        this.menu = [];
        this.menu = res;
        console.log(this.menu);

        if(!this.selectedItem){
          this.selectedItem = {...this.menu[0]}
        }
        
      },
      err=>{

      }
    )
    
  }


  @Input()
  restaurantId!: string;
  menu:Item[]=[];
  selectedItem!:Item;

  menuHook = new EventEmitter();


  addItemBtn(){
    this.popupService.openAddItemDialog().subscribe(
      res=>{
        // console.log(res);
        if(!res){
          this.popupService.openSnackBar("adding item canceled")
          return;
        }

        this.addNewItemToMenu( res as Item );
        // this.popupService.openSnackBar("success!")

      },
      err=>{
        console.log("cancel");
        this.popupService.openSnackBar("error")
        
      }
    )
}
  addNewItemToMenu(newItem:Item){

    newItem.price = Number(newItem.price);
    newItem.restaurantId = this.restaurantId;
    console.log(newItem);
    this.menuService.addItemToMenu(newItem).subscribe(
      res=>{
        this.popupService.openSnackBar("successfully added to menu");
        this.ngOnInit();
      },
      err=>{
        this.popupService.openSnackBar("item could not be added to menu")

      },
    )

    
  }
  click(){
    this.ngOnInit();
  }
  refreshData(){
    console.log("data refresh");
    this.selectedItem = this.menu[0];
    this.ngOnInit();
  }
  onItemSelect(select:Item){
    this.selectedItem = {...select};
  }

}
