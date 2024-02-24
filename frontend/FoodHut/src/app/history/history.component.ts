import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Customer } from '../model/Customer';
import { KeyType } from '../model/KeyType';
import { PopupService } from '../service/popup.service';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent  implements OnInit,OnChanges{
  

  
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
