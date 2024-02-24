import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Customer } from '../model/Customer';
import { DecodedTokenObject } from '../model/DecodedTokenObject';
import { KeyType } from '../model/KeyType';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-favorites-panel',
  templateUrl: './favorites-panel.component.html',
  styleUrls: ['./favorites-panel.component.css']
})

export class FavoritesPanelComponent implements OnInit, OnChanges{

  constructor(

    private tokenService:TokenService,
    private userService:UserService,
  ){}

  ngOnChanges(changes: SimpleChanges): void {
  
  }
  ngOnInit(): void {
      const token = this.tokenService.getToken(KeyType.AUTH_TOKEN);
    if (!token) {
      return;
    }

    const decodedToken: DecodedTokenObject = this.tokenService.decodeToken(token);
    this.isLoggedIn = true;

    this.userService.getCustomerDetails(token).subscribe(
      (res: Customer) => {
        if (res) {
          this.isLoggedIn = true;
          this.currentUser = res;
        }
      },
      (err) => {
        console.error(err);
      }
    );

  }


  isLoggedIn:boolean = false;
  
  @Input()
  currentUser!:Customer;


  
}
