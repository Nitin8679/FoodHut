import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PopupService } from '../service/popup.service';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';
import { KeyType } from '../model/KeyType';
import { Customer } from '../model/Customer';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']
})
export class CartpageComponent implements OnInit{

  
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

}
