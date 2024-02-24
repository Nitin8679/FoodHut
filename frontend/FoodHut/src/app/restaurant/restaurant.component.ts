import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../model/Customer';
import { KeyType } from '../model/KeyType';
import { Restaurant } from '../model/Restaurant';
import { ImageService } from '../service/image.service';
import { PopupService } from '../service/popup.service';
import { RestaurantService } from '../service/restaurant.service';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit,OnChanges{
  

  constructor(
    private activatedRoute:ActivatedRoute,
    private restaurantService:RestaurantService,
    private imageService:ImageService,
    private tokenService:TokenService,
    private userService:UserService,
    private popupService:PopupService,
  ){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      res=>{
        this.restaurantId = res.get('id')


                //get restaurant details
                this.restaurantService.getRestaurant(this.restaurantId).subscribe(
                  res=>{
                    // console.log(res);
                    this.selectedRestaurant = res;
                    // console.log(this.selectedRestaurant);
                    
                  },
                  
                  err=>{
                    console.log(err);
        
                  }
                )
                //get restaurant image
                this.imageService.downloadAssociatedImage(this.restaurantId).subscribe(
                  res=>{
                    this.imageUrl = res;
                  },
                  err=>{
        
                  }
                )


        
        // console.log(this.restaurantId);
        

        //favorites check
        this.token  = this.tokenService.getToken(KeyType.AUTH_TOKEN);
        if(this.token ){
          this.isLoggedIn = true;
          const dto = this.tokenService.decodeToken(this.token);
          this.customerId = dto.customerId;
        }else{
          this.isLoggedIn = false;
          this.customerId ='';
          return;
        }
    
        this.userService.getCustomerDetails( this.token ).subscribe(
          res=>{
            // console.log(res);
            if(this.restaurantId){
    
              const customer:Customer =res;
              // console.log(this.item.id);
              this.isFavorite = this.findInFavorites( this.restaurantId , customer.favoriteRestaurants )
              console.log(this.isFavorite);
              
            }
            
            
            
          },
          err=>{
            // this.popupService.openSnackBar("userdetails fetch fail")
            console.log(err);
            
          }
        )









        
      },
      err=>{
        console.log("param mapping fail");
        console.log(err);
        this.popupService.openSnackBar("prarm mapping falied");
        
      }
      )
      
      
    }
    ngOnChanges(changes: SimpleChanges): void {
    
  
  }

  restaurantId:string;
  selectedRestaurant!:Restaurant;


  isLoggedIn:boolean = false;

  imageUrl: string | ArrayBuffer | null = '';
  isFavorite:boolean= false;
  token!:string;
  customerId!:string;


  addRestaurantToFavorites(){
    const token = this.tokenService.getToken(KeyType.AUTH_TOKEN);
    
    if(!token){
      console.log("token fetch failed");
      this.popupService.openSnackBar("token fetch failed");

      
      return;
    }


    const dto = this.tokenService.decodeToken(token);
    
    // console.log(dto);

    if(!this.restaurantId){

      console.log("restaurant id fetch failed");
      this.popupService.openSnackBar("restaurant id fetch failed");
      
      return;
    }




        // if item already set to favorite 
        if(this.isFavorite){
          this.userService.removeFavoriteResaurant( this.restaurantId, dto.customerId ).subscribe(
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
    
    
    

    // console.log(this.restaurantId);
    
    //if  favorites not set
    this.userService.addFavoriteRestaurant( this.restaurantId , dto.customerId  ).subscribe(
      res=>{
        
        this.popupService.openSnackBar("added to favorites");
        this.ngOnInit();
      },
      err=>{
        
        this.popupService.openSnackBar("adding failed");
        this.ngOnInit();
      }
    )
    
    
    
  }

  findInFavorites(itemId:string, favorites:string[]):boolean{
    
    return favorites.includes(itemId);
  }
}
