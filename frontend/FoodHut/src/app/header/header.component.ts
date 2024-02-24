import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../service/routes.service';
import { TokenService } from '../service/token.service';
import { KeyType } from '../model/KeyType';
import { AuthService } from '../service/auth.service';
import { PopupService } from '../service/popup.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private routing: RoutesService,
    private authService: AuthService,
    private tokenService: TokenService,
    private routesService:RoutesService,
    private popup:PopupService,
    public cartService:CartService
  ) {
  
  }

  ngOnInit(): void {
    const token = this.tokenService.getToken(KeyType.AUTH_TOKEN);

    if (token) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    this.authService.onAuthChanges.subscribe(res => {
      if (this.tokenService.getToken(KeyType.AUTH_TOKEN)) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
      console.log('Header component initialized');
  }

  isLoggedIn = false;

  cartviewBtn(){
    console.log("cartviw btn");
    
    this.routing.cartviewRoute();
    
    
  }
  loginBtn() {
    console.log("login btn");
    this.routing.loginRoute();
  }

  signupBtn() {
    this.routing.signupRoute();
  }

  homeBtn() {
    console.log("home Btn"); 
    this.routing.homeRoute();
  }
  historyBtn(){
    this.routing.historyRoute();
  }
  profileBtn() {
    this.routing.profileRoute();
  }

  restaurantControlBtn() {
    this.routing.restaurantControlRoute();
  }

  imageUploaderBtn() {
    this.routing.imageUploaderRoute();
  }

  openRestaurantView(): void {
    // Implement logic for opening restaurant view
    // For example:
    // this.routing.restaurantViewRoute();
    this.restaurantControlBtn();
    console.log('Opening Restaurant View');
  }
  historyview(): void{
    this.historyBtn()
    console.log('history view')
  }

  openProfileSettings(): void {
    // Implement logic for opening profile settings
    // For example:
    // this.routing.profileSettingsRoute();
    this.profileBtn();
    console.log('Opening Profile Settings');
  }

  logout() {
   
    console.log('Logout clicked');
  
    this.tokenService.removeToken(KeyType.AUTH_TOKEN);
    this.isLoggedIn = false;
    this.routesService.homeRoute();
    this.popup.openSnackBar("Logged out")
   
    
  }
  
}
