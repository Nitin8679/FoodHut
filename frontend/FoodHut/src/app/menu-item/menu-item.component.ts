import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Customer } from '../model/Customer';
import { Item } from '../model/Item';
import { KeyType } from '../model/KeyType';
import { Order } from '../model/Order';
import { ImageService } from '../service/image.service';
import { MenuService } from '../service/menu.service';
import { OrderService } from '../service/order.service';
import { PopupService } from '../service/popup.service';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit,OnChanges{
  
  constructor(
    private imageService:ImageService,
    private orderService:OrderService,
    private popupService:PopupService,
    private userService:UserService,
    private tokenService:TokenService,
    private cartService:CartService
  ){}
  
  ngOnInit(): void {
    this.token  = this.tokenService.getToken(KeyType.AUTH_TOKEN);
    if(this.token ){
      const dto = this.tokenService.decodeToken(this.token);
      this.customerId = dto.customerId;
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
      this.customerId ='';
      return;
    }

    this.userService.getCustomerDetails( this.token ).subscribe(
      res=>{
        // console.log(res);
        if(this.item){

          const customer:Customer =res;
          // console.log(this.item.id);
          this.isFavorite = this.findInFavorites(this.item.id, customer.favoriteItems )
          console.log(this.isFavorite);
          
        }
        
        
        
      },
      err=>{
        this.popupService.openSnackBar("userdetails fetch fail")
        console.log(err);
        
      }
    )


  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.item);s
    
  
    try{

      if(this.item){



  
        this.imageService.downloadAssociatedImage(this.item.id).subscribe(
          res=>{
          
              this.imageUrl = res;

          },
          err=>{

            this.imageUrl  = '';
          }
        )
  
      }

    }catch( e ){
      this.imageUrl = '';
    }
  
  }

  imageUrl: string  = '';

  @Input()
  item!:Item;
  token:string;

  isLoggedIn:boolean = false;
  customerId!:string;
  isFavorite:boolean= false;

  addToCart(){
    // console.log(this.item);

    const newOrder:Order = {
      customerId:this.customerId,
      itemId: this.item.id,
      restaurantId: this.item.restaurantId ,
      amount:1,
    }
    this.orderService.addOrderToCart(newOrder).subscribe(
      res=>{
        this.popupService.openSnackBar("adding success");
        this.cartService.isChanged=true;
        console.log(res);
        
      },
      err=>{
        
        this.popupService.openSnackBar("adding failure")

      }
    )
    // this.popupService.openSetAmountDialog().subscribe(
    //   res=>{
    //     // console.log(res);
        
    //     if(!res){
    //       this.popupService.openSnackBar("canceled")
    //       return;
    //     }

    //     newOrder.amount = res;
    //     console.log(newOrder);
        
    //     this.orderService.addOrderToCart(newOrder).subscribe(
    //       res=>{
    //         this.popupService.openSnackBar("adding success");
    //         this.cartService.isChanged=true;
    //         console.log(res);
            
    //       },
    //       err=>{
            
    //         this.popupService.openSnackBar("adding failure")

    //       }
    //     )
        
    //   }
    // )
  }


  addItemToFavorites(){
    const token = this.tokenService.getToken(KeyType.AUTH_TOKEN);
    if(!token){
      console.log("token fetch failed");
      this.popupService.openSnackBar("token fetch failed");
      return;
    }

    const dto = this.tokenService.decodeToken(token);
    
    
    if(!this.item.id){

      console.log("restaurant id fetch failed");
      this.popupService.openSnackBar("item id fetch failed");
      
      return;
    }



    
    // if item already set to favorite 
    if(this.isFavorite){
      this.userService.removeFavoriteItem( this.item.id, dto.customerId ).subscribe(
        res=>{

          console.log(res);
          
          this.ngOnInit();
          this.popupService.openSnackBar("Removed from favorites");
          
        },
        err=>{
          
          console.log(err);
          this.ngOnInit();
          this.popupService.openSnackBar("removing failed");
          
        }
      )
      
      return;
    }



    


    
    // console.log(dto);


    // console.log(this.item.id);
    


    //if item not set to favorite 
    this.userService.addFavoriteitem( this.item.id , dto.customerId  ).subscribe(
      res=>{
        console.log(res);
        
        this.popupService.openSnackBar("added to favorites");
        this.ngOnInit();
      },
      err=>{
        console.log(err);
        this.ngOnInit();
        
        this.popupService.openSnackBar("adding failed");
      }
    )
    

  }


  findInFavorites(itemId:string, favorites:string[]):boolean{
    
    return favorites.includes(itemId);
  }

}
