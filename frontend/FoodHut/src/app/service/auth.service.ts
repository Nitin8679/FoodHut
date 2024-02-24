import { EventEmitter, Injectable, Output } from '@angular/core';
import { KeyType } from '../model/KeyType';
import { TokenService } from './token.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private tokenService:TokenService,
  ) { }


  @Output()
  onAuthChanges = new EventEmitter();




}
