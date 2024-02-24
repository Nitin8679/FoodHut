
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRequest} from '../model/AuthRequest';
import { KeyType } from '../model/KeyType';
import { AuthService } from '../service/auth.service';
import { PopupService } from '../service/popup.service';
import { RoutesService } from '../service/routes.service';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private userService:UserService,
    private fb:FormBuilder,
    private popup:PopupService,
    private tokenService:TokenService,
    private authService:AuthService,
    private routesService:RoutesService
  ){}

  loginForm:FormGroup=this.fb.group(
    {
      emailId:['',Validators.required],
      password:['',Validators.required]
    }
  )

  showPassword:boolean = false;
  
  get emailId(){
    return this.loginForm.get('emailId');
  }
  get password(){
    return this.loginForm.get('password');
  }


  
  

  login(){

    const newAuthRequest:AuthRequest = {
      email:this.emailId?.value,
      password:this.password?.value
    }

    this.userService.customerAuthLogin(newAuthRequest).subscribe(
      res=>{
        // console.log(res);
        console.log( res.key );

        if(!res){
          this.popup.openSnackBar("login failed")
          return;
        }
        
        if(res.key){
          this.tokenService.storeToken( KeyType.AUTH_TOKEN , res.key )        
        }else{
          this.popup.openSnackBar("unable to store key","try again")
        }

        this.popup.openSnackBar("successfully  logged  in");

        this.routesService.homeRoute();
        
        this.authService.onAuthChanges.emit();
      },
      err=>{
        this.popup.openSnackBar("login failed","try again")
        console.log(err);
        
      }
    )

  }


  cancel(){}

}
