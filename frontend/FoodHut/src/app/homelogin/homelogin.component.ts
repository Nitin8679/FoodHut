import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkEmail } from './customValidator';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from '../service/token.service';
import { KeyType } from '../model/KeyType';
import { AuthService } from '../service/auth.service';
import { RoutesService } from '../service/routes.service';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-homelogin',
  templateUrl: './homelogin.component.html',
  styleUrls: ['./homelogin.component.css']
})
export class HomeloginComponent implements OnInit{
  ngOnInit() {
    // SVG Animation using anime.js
    const design = anime({
      targets: 'svg #XMLID5',
      keyframes: [
        { translateX: -500 },
        { rotateY: 180 },
        { translateX: 920 },
        { rotateY: 0 },
        { translateX: -500 },
        { rotateY: 180 },
        { translateX: -500 },
      ],
      easing: 'easeInOutSine',
      duration: Infinity,
    });

    anime({
      targets: '#dust-paarticle path',
      translateY: [10, -150],
      direction: 'alternate',
      loop: true,
      delay: function (el, i, l) {
        return i * 100;
      },
      endDelay: function (el, i, l) {
        return (l - i) * 100;
      }
    });
  }
  

    otp?:string;
    receivedOTP?:number;
    resendotp:boolean=false;
    otpSection:boolean=false;
    constructor(private router:Router,private userService:UserService,private snackBar:MatSnackBar,private tokenService:TokenService
      ,private authService:AuthService,
    private routesService:RoutesService){
      
    }
    loginForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/),checkEmail()])
    })
   get email(){
      return this.loginForm.get('email');
    }
    goToHome(){
      this.router.navigateByUrl("/");
    }
   
    getOTP(){
      
      console.log(this.loginForm.value);
      this.userService.authLogin(this.loginForm.value).subscribe(
        success=>{
          console.log(success);
          this.otpSection=true;
        },
        failure=>{
          console.log(failure);
          this.snackBar.open("Login Failed","Failure",{
            duration:2000,
            panelClass:["mat-toolbar","mat-primary"]
          })
        }
      );
    }
    checkOTP(){
      if(this.otp){
      this.userService.checkOTP(parseInt(this.otp),this.loginForm.value).subscribe(
        success=>{
          this.tokenService.storeToken(KeyType.AUTH_TOKEN,success.key);
          this.snackBar.open("Logged In","Success",{
            duration:2000,
            panelClass:['mat-toolbar','mat-primary']
          });
          this.routesService.homeRoute();
        
          this.authService.onAuthChanges.emit();
        },
        failure=>{
          console.log(failure);
          this.snackBar.open("Login Failed","Failure",{
            duration:2000,
            panelClass:['mat-toolbar','mat-warn']
          });
          this.resendotp=true;
        }
      )
    }
    }
    resendOTP(){
      this.userService.getOTP(this.loginForm.value).subscribe(
        success=>{
          this.snackBar.open("OTP Sent successfully",success,{
            duration:2000,
            panelClass:["mat-toolbar","mat-primary"]
          })
        },
        failure=>{
          console.log(failure);
        }
      )
    }
    signup(){
      this.router.navigateByUrl("/signup");
    }
}