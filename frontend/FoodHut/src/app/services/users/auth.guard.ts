import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KeyType } from 'src/app/model/KeyType';
import { RoutesService } from 'src/app/service/routes.service';
import { TokenService } from 'src/app/service/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService:TokenService,
    private routesService:RoutesService,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    

      const token =this.tokenService.getToken(KeyType.AUTH_TOKEN);
      if(token){
        return true;
      }else{
        this.routesService.loginRoute();
        return false;
      }
  }
  
}
