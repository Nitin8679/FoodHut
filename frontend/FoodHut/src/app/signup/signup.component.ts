import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { Address } from '../model/Address';
import { cities, states } from '../model/AddressList';
import { Registration } from '../model/Registration';
import { PopupService } from '../service/popup.service';
import { RoutesService } from '../service/routes.service';
import { UserService } from '../service/user.service';
import { matchConfirmPassword } from '../validator/PasswordMatcher';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private popup:PopupService,
    private routesService:RoutesService,

  ){}


  ngOnInit(): void {
    
  }
  _states = Object.values(states);
  _cities:string[] = [];
  showPassword: boolean = false;  
  canQuit:boolean=true;
  isRegistered:boolean = false;

  
//do not remove the below , form  validation for user signup, currently commented for convenience

  registerForm:FormGroup = this.fb.group({
    username:['',[Validators.required,Validators.minLength(2),]],
    email:['',[
      Validators.required ,
      Validators.pattern( /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z][A-Za-z0-9.-]*\.[A-Za-z]{2,}$/ )
    ]
  ],
    contactno:['', [Validators.pattern(/^\d{10}$/)] ],
  //   password:['',[
  //     Validators.required,
  //     Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/)
  //   ]
  // ],
  //   confirmPassword:['',[
  //     Validators.required,
  //     Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/)

  //   ]

  });
  addressForm:FormGroup = this.fb.group(
    {
      state:['',Validators.required],
      city:['',Validators.required],
      street:['',Validators.required],
      doorNo:['',Validators.required],
      zipcode:['', [Validators.pattern(/^\d{5,6}$/) ]]
    }
  )




// registerForm:FormGroup = this.fb.group({
//   username:['',[Validators.required,Validators.minLength(2),]],
//   email:[''],
//   contactno:[''],
//   password:[''],
//   confirmPassword:['']
// }, { validators: matchConfirmPassword});
// addressForm:FormGroup = this.fb.group(
//   {
//     state:['',Validators.required],
//     city:['',Validators.required],
//     street:['',Validators.required],
//     doorNo:['',Validators.required],
//     zipcode:['', [Validators.pattern(/^\d{5,6}$/) ]]
//   }
// )







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





  

  signup(){
    const newCustomer:Registration ={
      id:this.email?.value,
      name:this.username?.value,
      contact:this.contactno?.value,
      password:this.password?.value,
      address:this.addressForm.value
    }




    console.log(newCustomer);
    this.userService.customerRegister(  newCustomer ).subscribe(
      res=>{
        this.popup.openSnackBar("Registration successful, now login to with your credentails ","OK");
        this.isRegistered=true;
        this.routesService.loginRoute();
        
      },
      err=>{
        this.isRegistered=false;
        this.popup.openSnackBar("Registration failed","Try again");
        console.log(err);
        
      }
    )

  }
    



  cancel(){
    console.log('cancel');
  }

  stateChange(event: any){
    const selectedState = event.value;
    this._cities = cities[selectedState]  || [] ;
    this.addressForm.get('city')?.reset();

  }

  canDeactivate(): Observable<boolean> {
    if (this.registerForm.touched || this.addressForm.touched  ) {
      this.canQuit = false;
    }

    if(this.isRegistered){
      this.canQuit = true;
    }
  
    if (!this.canQuit) {
      return this.popup.openQuitConfrimDialog().pipe(map(res => {
        this.canQuit = res;
        return this.canQuit;
      }));
    } else {
      return of(this.canQuit);
    }
  }




}
