import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { UserService } from '../service/user.service';
import { TokenService } from '../service/token.service';
import { KeyType } from '../model/KeyType';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit,OnChanges{
  
  constructor(
    private tokenService:TokenService,
    private userService:UserService
  ){
  }

  ngOnChanges(changes: SimpleChanges): void {
  
  }
  ngOnInit(): void {
    


  }
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );



}
