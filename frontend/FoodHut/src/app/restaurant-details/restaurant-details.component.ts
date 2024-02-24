import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../model/Address';
import { states , cities } from '../model/AddressList';
import { Metadata } from '../model/Metadata';
import { Owner } from '../model/Owner';
import { Restaurant } from '../model/Restaurant';
import { ImageService } from '../service/image.service';
import { PopupService } from '../service/popup.service';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit, OnChanges{
  
  constructor(
    private popupService:PopupService,
    private restaurantServcie:RestaurantService,
    private fb:FormBuilder,
    private imageService:ImageService,

  ){}


  
  ngOnInit(): void {

    // console.log("RestaurantDetailsComponent");
    

  }
  ngOnChanges(changes: SimpleChanges): void {

    this.lastChanges = changes;
    if( this.restaurantId ){

        this.imageService.downloadAssociatedImage( this.restaurantId ).subscribe(
          res=>{
            if(!res){
              this.imageUrl = ''
              return;
            }


            this.imageUrl = res;

            this._imageUrl = res;
          },
          err=>{
            this.imageUrl = ''
          }
        )

     

      this.restaurantServcie.getRestaurant ( this.restaurantId ).subscribe(
        res=>{

          if(!res){

            return;
          }
          this.restaurant = {...res};
          // console.log(this.restaurant);

          //sets the city based on state
          this._cities = cities[ this.restaurant.address.state ]

          
          //set  data for all the forms
          this.addressForm = this.fb.group(
            {
              restaurantState:[  this.restaurant.address.state , [Validators.required] ],
              restaurantCity:[ this.restaurant.address.city , [Validators.required] ],
        
              restaurantStreet:[ this.restaurant.address.street , [Validators.required] ],
              restaurantArea:[ this.restaurant.address.area , [Validators.required] ],
              restaurantZipcode:[  this.restaurant.address.zipcode , [Validators.required , Validators.pattern(/^\d{5,6}$/) ] ]
            }
          )
          this.detailsForm = this.fb.group(
            {
              restaurantName:[ this.restaurant.name ,  [Validators.required , Validators.minLength(2)] ],
              restaurantContact:[ this.restaurant.contact , [ Validators.required,  Validators.pattern(/^\d{10}$/) ] ],
              description:[this.restaurant.description ,  [  Validators.maxLength(200) ] ],
              cuisineType:[ this.restaurant.cuisineType  , [Validators.required , Validators.minLength(2)  ] ]
            }
          )
          this.ownerForm = this.fb.group(
            {
              ownerEmail:[ this.restaurant.owner.email, 
                [
                  Validators.required,
                  Validators.pattern( /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z][A-Za-z0-9.-]*\.[A-Za-z]{2,}$/ )
                ] 
              ], 
              ownerContact:[ this.restaurant.owner.contact , [ Validators.required,  Validators.pattern(/^\d{10}$/) ] ], 
              ownerName:[ this.restaurant.owner.fullName , [Validators.required , Validators.minLength(2)  ] ]
            }
          )


        },
        err=>{
          this.popupService.openSnackBar("restaurant does not exist")
        }
      )
    }else{
      this.popupService.openSnackBar("404, restaurant not found")
    }

    this.selectedImage = null;
  }

  
  restaurant!:Restaurant;
  
  @Input()
  restaurantId!:string;

  _states = Object.values(states);
  _cities:string[] = [];


  lastChanges:SimpleChanges ={};

  isEditingForm:boolean = false;
  isEditingImage:boolean = false;

  selectedImage!:File;
  imageUrl: string  = '';
  _imageUrl: string  = '';

  
  detailsForm:FormGroup = this.fb.group(
    {
      // restaurantName:[''],
      // restaurantContact:[''],
      // description:[''],
      // cuisineType:['']
    }
  )
  ownerForm:FormGroup = this.fb.group(
      {
        // ownerEmail:[''], 
        // ownerContact:[''], 
        // ownerName:[''] 
      }
  )
  addressForm:FormGroup = this.fb.group(
      {
        // restaurantState:[''],
        // restaurantCity:[''],
        // restaurantStreet:[''],
        // restaurantArea:[''],
        // restaurantZipcode:['']
      }
  )

  

  get restaurantName(){
    return this.detailsForm.get("restaurantName");
  }
  get restaurantContact(){
    return this.detailsForm.get("restaurantContact");
  }
  get description(){
    return this.detailsForm.get("description");
  }
  get cuisineType(){
    return this.detailsForm.get("cuisineType");
  }


  
  get restaurantArea(){
    return this.addressForm.get("restaurantArea");
  }
  get restaurantStreet(){
    return this.addressForm.get("restaurantStreet");
  }
  get restaurantZipcode(){
    return this.addressForm.get("restaurantZipcode");
  }
  get restaurantCity(){
    return this.addressForm.get("restaurantCity");
  }
  get restaurantState(){
    return this.addressForm.get("restaurantState");
  }



  get ownerEmail(){
    return this.ownerForm.get("ownerEmail");
  }
  get ownerContact(){
    return this.ownerForm.get("ownerContact");
  }
  get ownerName(){
    return this.ownerForm.get("ownerName");
  }

  stateChange(event: any){
    const selectedState = event.value;
    this._cities = cities[selectedState]  || [] ;
    this.addressForm.get('restaurantCity')?.reset();

  }
  
  findIndexInArray(arr: string[], searchStr: string): number {
    const index = arr.indexOf(searchStr);
    return index !== -1 ? index : -1;
  }

  editForm(){
    this.isEditingForm = true;
  }
  updateRestaurant(){
    // console.log(this.detailsForm.value);
    // console.log(this.ownerForm.value);
    // console.log(this.addressForm.value);

    const updatedRestaurant:Restaurant = {...this.restaurant };
    const updatedOwner:Owner ={
      fullName: this.ownerName.value,
      contact: this.ownerContact.value,
      email: this.ownerEmail.value
    };
    const updatedAddress:Address = {
      state: this.restaurantState.value ,
      city: this.restaurantCity.value,
      area: this.restaurantArea.value,
      street: this.restaurantStreet.value,
      zipcode: this.restaurantZipcode.value
    };

    updatedRestaurant.name = this.restaurantName.value;
    updatedRestaurant.contact = this.restaurantContact.value;
    updatedRestaurant.cuisineType = this.cuisineType.value;
    updatedRestaurant.description = this.description.value;

    updatedRestaurant.owner = updatedOwner;
    updatedRestaurant.address = updatedAddress;

    // console.log(updatedRestaurant);
    
    this.restaurantServcie.updateRestaurant( updatedRestaurant ).subscribe(
      res=>{
        this.popupService.openSnackBar("update successfull");
        this.ngOnChanges(this.lastChanges);
        this.isEditingForm = false;

      },
      err=>{
        console.log(err);
        this.popupService.openSnackBar("could not be updated");
        this.ngOnChanges(this.lastChanges);
        this.isEditingForm = false;
      }
    )


    
  }


  uploadImage(){
    // console.log(this.selectedImage);
    this.isEditingImage = false;

    if(!this.selectedImage){

      this.popupService.openSnackBar("file not selected")
      return;
    }
    
    const newMetadata:Metadata ={
      imageType:"RESTAURANT",
      imageOf: this.restaurant.id,
      fileType: this.selectedImage.type
    }
    
    // console.log(newMetadata);
    

    this.imageService.uploadImage( this.selectedImage  , newMetadata ).subscribe(
      res=>{
        this.popupService.openSnackBar("successfuly updated")
        this.ngOnChanges(this.lastChanges);
      },
      err=>{
        this.popupService.openSnackBar("upload failed")

      }
    )
    
  }

  cancelForm(){
    this.isEditingForm = false;
    this.ngOnChanges(this.lastChanges);
  }


  cancelImageEdit(){
    this.imageUrl = this._imageUrl;
    // this.selectedImage = null;
    this.isEditingImage = false;
  }

  //attach to 'choose image' btn
  openFileInput(){
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if(fileInput){
      fileInput.click();
    }
  }

  
  displayImage(): void {
    // Create a FileReader to read the selected image
    const reader = new FileReader();

    reader.onload = (e: any) => {
      // Set the imageUrl to the base64 representation of the selected image
      this.imageUrl = e.target.result;
    };

    // Read the selected image as data URL
    reader.readAsDataURL(this.selectedImage!);
  }
  onFileChanged(event: any): void {
    this.selectedImage = event.target.files[0];

    if (this.selectedImage) {
      // Display the selected image
      this.displayImage();
    }
  }




  click(){
    // this.popupService.openSnackBar("CLICKED")
    // console.log(this.addressForm.value);
    

  }


}
