import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { cities, states } from '../model/AddressList';
import { Customer } from '../model/Customer';
import { KeyType } from '../model/KeyType';
import { Metadata } from '../model/Metadata';
import { AuthService } from '../service/auth.service';
import { ImageService } from '../service/image.service';
import { PopupService } from '../service/popup.service';
import { RoutesService } from '../service/routes.service';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnChanges{

  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private popup:PopupService,
    private tokenService:TokenService,
    private imageService:ImageService,
    private routesService:RoutesService,
    private authService:AuthService,

  ){}

  ngOnInit(): void {
    
    this.initializer();
    

    const token = this.tokenService.getToken(KeyType.AUTH_TOKEN);
    if(token){
      const dto = this.tokenService.decodeToken(token);

      
      
      this.imageService.downloadAssociatedImage( dto.customerId ).subscribe(

        res=>{
          this.imageUrl = res;
          this._imageUrl = res;
        },
        err=>{
          this.popup.openSnackBar("image download failed");
        }
      )
      
      
      
      
      
      
      
      this.userService.getCustomerDetails(token).subscribe(
        res=>{
          // console.log(res);
          this.currentUser = res as Customer;


          this._cities = cities[ this.currentUser.address.state ]
          


          this.registerForm = this.fb.group({
            username:[ this.currentUser.name  ],
            email:[  this.currentUser.id  ],
            contactno:[ this.currentUser.contact ],
          })

          this.addressForm= this.fb.group(
            {
              state:[  this.currentUser.address.state  ],
              city:[ this.currentUser.address.city ],
              street:[ this.currentUser.address.street ],
              doorNo:[ this.currentUser.address.doorNo ],
              zipcode:[ this.currentUser.address.zipcode ]
            }
          )


          this.disableForm();
          this.email.disable();


        },
        err=>{
          console.log(err);

        }
      )
    }

  
  }
  ngOnChanges(changes: SimpleChanges): void {
    
    // this.userService.getCustomerDetails();
    
  }

  @Input()
  customerId!:string;
  
  currentUser!:Customer;
  isEditingForm:boolean =false ;
  isEditingImage:boolean =false ;
  
  lastChanges:SimpleChanges;

  imageUrl:string ='';
  _imageUrl:string ='';

  selectedImage!:File;


  _states = Object.values(states);
  _cities:string[] = [];

  emailDisabled=true;

  
  registerForm:FormGroup = this.fb.group({
    username:[''],
    email:[ '' ],
    contactno:[''],
  })
  addressForm:FormGroup = this.fb.group(
    {
      state:[],
      city:[],
      street:[''],
      doorNo:[''],
      zipcode:['']
    }
  )
  get username(){
    return this.registerForm.get('username');
  }
  get email(){
    return this.registerForm.get('email');
  }
  get contactno(){
    return this.registerForm.get('contactno');
  }
  get password(){
    return this.registerForm.get('password');
  }
  get confirmPassword(){
    return this.registerForm.get('confirmPassword');
  }

  get state(){
    return this.addressForm.get('state');
  }
  get city(){
    return this.addressForm.get('city');
  }
  get street(){
    return this.addressForm.get('street');
  }

  get doorNo(){ 
    return this.addressForm.get('doorNo');
  }
  get zipcode(){
    return this.addressForm.get('zipcode');
  }

  stateChange(event: any){
    const selectedState = event.value;
    this._cities = cities[selectedState]  || [] ;
    this.addressForm.get('city')?.reset();

  }

  updateForm(){
    const updatedCustomerDetails:Customer = {... this.currentUser};
    updatedCustomerDetails.name = this.username.value;
    updatedCustomerDetails.contact = this.contactno.value;
    updatedCustomerDetails.address.state = this.state.value;
    updatedCustomerDetails.address.city = this.city.value;
    updatedCustomerDetails.address.street = this.street.value;
    updatedCustomerDetails.address.doorNo = this.doorNo.value; 
    updatedCustomerDetails.address.zipcode =  this.zipcode.value;
    
    // console.log(updatedCustomerDetails);


    this.userService.editAccount( updatedCustomerDetails ).subscribe(
      res=>{
        console.log(res);
        
        this.popup.openSnackBar("sucessfully edited account details")
        this.ngOnInit();
      },
      err=>{
        this.popup.openSnackBar("edit failure")

      }
    )
  }
  editForm(){
    this.isEditingForm = true;
    this.enableForm();
    
  }
  editImage(){
    this.isEditingImage = true;

  }

  cancelFormEdit(){
    
    this.isEditingForm = false;
    this.disableForm();

    this.ngOnInit();
    // this.ngOnChanges(this.lastChanges); 

  
  }
  cancelImageEdit(){
    this.imageUrl = this._imageUrl;
    this.isEditingImage = false;
  }
  changeImage(){
    this.isEditingImage = true;

  }


  uploadImage(){

    this.isEditingImage = false;

    if(!this.selectedImage){

      this.popup.openSnackBar("file not selected")
      return;
    }
    
    const newMetadata:Metadata ={
      imageType:"CUSTOMER",
      imageOf: this.currentUser.id ,
      fileType: this.selectedImage.type
    }
    
    
    console.log(newMetadata);
    
    this.imageService.uploadImage( this.selectedImage ,newMetadata ).subscribe(
      res=>{

        this.popup.openSnackBar("image successfully uploaded");
        
        this.ngOnInit();
      },
      err=>{
        this.popup.openSnackBar("upload failed");

      }
    )

    

  }

  logout(){

    this.popup.openCofirmationDialog("Are your sure your want to Logout?").subscribe(
      res=>{
        if(res){
          this.tokenService.removeToken(KeyType.AUTH_TOKEN);
          this.routesService.homeRoute();
          this.popup.openSnackBar("Logged out")
          this.authService.onAuthChanges.emit();          
        }

      },
      err=>{

      }
    )



  }

  onFileChanged(event: any): void {
    this.selectedImage = event.target.files[0];

    if (this.selectedImage) {
      // Display the selected image
      this.displayImage();
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
  openFileInput(){
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if(fileInput){
      fileInput.click();
    }
  }

  initializer(){

    this.isEditingForm = false;
    this.isEditingImage = false;
    this.selectedImage = null;
    this.imageUrl=''
    this._imageUrl='';

  }

  disableForm(){
    this.username.disable();
    this.contactno.disable();
    this.state.disable();
    this.city.disable();
    this.street.disable();
    this.doorNo.disable();
    this.zipcode.disable();
  }
  enableForm(){
    this.username.enable();
    this.contactno.enable();
    this.state.enable();
    this.city.enable();
    this.street.enable();
    this.doorNo.enable();
    this.zipcode.enable();
  }

}
