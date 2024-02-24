import { TokenType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../model/Address';
import { cities, states } from '../model/AddressList';
import { DecodedTokenObject } from '../model/DecodedTokenObject';
import { KeyType } from '../model/KeyType';
import { Restaurant } from '../model/Restaurant';
import { PopupService } from '../service/popup.service';
import { RestaurantService } from '../service/restaurant.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styleUrls: ['./register-restaurant.component.css']
})
export class RegisterRestaurantComponent implements OnInit{
  

  constructor(
    private fb:FormBuilder,
    private restaurantService:RestaurantService,
    private  tokenService:TokenService,
    private  popupService:PopupService

  ){}

  ngOnInit(): void {

    this.authToken = this.tokenService.getToken(KeyType.AUTH_TOKEN);
    if(this.authToken== null){
      this.popupService.openSnackBar("not logged in");
      return;
    } 
    console.log("logged in");
    
    
  }


  authToken:string | null=null;
  _states = Object.values(states);
  _cities:string[] = [];
  showPassword: boolean = false;  
  
  restaurantInfo:FormGroup = this.fb.group(
    {
      restaurantName:['',  [Validators.required , Validators.minLength(2)] ],
      restaurantContact:['', [ Validators.required,  Validators.pattern(/^\d{10}$/) ] ]
    }
  )
  ownerDetails:FormGroup = this.fb.group(
      {
        ownerEmail:['' ,  [
          Validators.required,
          Validators.pattern( /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z][A-Za-z0-9.-]*\.[A-Za-z]{2,}$/ )
        ] 
      ], 
        ownerContact:['' ,  [ Validators.required,  Validators.pattern(/^\d{10}$/) ]  ], 
        ownerName:['' , [Validators.required , Validators.minLength(2) ] ] 
      }
  )
  location:FormGroup = this.fb.group(
      {
        restaurantState:['' , [Validators.required] ],
        restaurantCity:[''  ,  [Validators.required]  ],
        restaurantStreet:[''  ,  [Validators.required] ],
        restaurantArea:['' ,  [Validators.required] ],
        restaurantZipcode:['' ,  [Validators.required,Validators.pattern(/^\d{6}$/)] ]
      }
  )
  extraInfo:FormGroup = this.fb.group(
        {
          description:['' ,  [  Validators.maxLength(100) ]  ],
          cuisineType:[''  ,  [Validators.required , Validators.minLength(2)  ]  ]
      }
  )
  
  

  get restaurantName(){
    return this.restaurantInfo.get("restaurantName");
  }
  get restaurantContact(){
    return this.restaurantInfo.get("restaurantContact");
  }
  

  
  get restaurantArea(){
    return this.location.get("restaurantArea");
  }
  get restaurantStreet(){
    return this.location.get("restaurantStreet");
  }
  get restaurantZipcode(){
    return this.location.get("restaurantZipcode");
  }
  get restaurantCity(){
    return this.location.get("restaurantCity");
  }
  get restaurantState(){
    return this.location.get("restaurantState");
  }


  get description(){
    return this.extraInfo.get("description");
  }
  get cuisineType(){
    return this.extraInfo.get("cuisineType");
  }

  get ownerEmail(){
    return this.ownerDetails.get("ownerEmail");
  }
  get ownerContact(){
    return this.ownerDetails.get("ownerContact");
  }
  get ownerName(){
    return this.ownerDetails.get("ownerName");
  }

  stateChange(event: any){
    const selectedState = event.value;
    this._cities = cities[selectedState]  || [] ;
    this.location.get('restaurantCity')?.reset();

  }

  register(){

    const tokenObject:DecodedTokenObject = this.tokenService.decodeToken(
      this.authToken as string
    );
    
    const newRestaurant:Restaurant = {
      name: this.restaurantName?.value,
      contact: this.restaurantContact?.value,
      userId: tokenObject.customerId ,
      owner:{
        fullName: this.ownerName?.value , 
        contact: this.ownerContact?.value,
        email: this.ownerEmail?.value
      },
      address:{
        state :  this.restaurantState?.value ,
        street: this.restaurantStreet?.value,
        city:  this.restaurantCity?.value ,
        area: this.restaurantArea?.value ,
        zipcode:this.restaurantZipcode?.value
      },
      cuisineType: this.cuisineType?.value ,
      description:this.description?.value
    }


    console.log(newRestaurant);
    


    // return;

    this.restaurantService.registerRestaurant(newRestaurant).subscribe(
      res=>{
        this.popupService.openSnackBar("sucessfully registered restaurant ","continue")
        console.log(res);
        

      },
      err=>{
        console.log(err);
        
        this.popupService.openSnackBar("failed to register restaurant","try again")
      }
    )


    // console.log(newRestaurant);
    
  }
  serve(){
    this.restaurantService.serve().subscribe(
      res=>{
        console.log(res);
        
      },
      err=>{
        console.log(err);

      }
    )
  }




}
