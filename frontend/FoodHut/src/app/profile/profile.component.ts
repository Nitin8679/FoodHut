import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Customer } from '../model/Customer';
import { KeyType } from '../model/KeyType';
import { PopupService } from '../service/popup.service';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnChanges{

  constructor(
    private userService:UserService,
    private tokenService:TokenService,
    private popupService:PopupService
  ){

  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  
  
  
  ngOnInit(): void {
    this.token = this.tokenService.getToken(KeyType.AUTH_TOKEN);  
    if(this.token){
      const dto = this.tokenService.decodeToken(this.token);
      this.customerId = dto.customerId;
    }

  }
  
  customerId:string;
  private currentUser:Customer;
  private token:string;

  profile(){
    console.log("profile");
    const token:string | null= this.tokenService.getToken( KeyType.AUTH_TOKEN) ;
    
    if(!token){
      this.popupService.openSnackBar("token non-existent");
      return;
    }

    
  }

}
