import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterRestaurantComponent } from './register-restaurant/register-restaurant.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantPanelComponent } from './restaurant-panel/restaurant-panel.component';
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { RestaurantControlComponent } from './restaurant-control/restaurant-control.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantsInCityComponent } from './restaurants-in-city/restaurants-in-city.component';
import { AuthGuard } from './services/users/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuitConfirmGuard } from './services/users/quit-confirm.guard';
import { CartpageComponent } from './cartpage/cartpage.component';
import { HistoryComponent } from './history/history.component';
import { HomeloginComponent } from './homelogin/homelogin.component';
import { FavoritesPanelComponent } from './favorites-panel/favorites-panel.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:HomeloginComponent},
  {path:'signup',component:SignupComponent, canDeactivate:[ QuitConfirmGuard ] },
  {path:'profile',component:ProfileComponent,canActivate :[AuthGuard]},
  {path:'restaurant',component:RestaurantPanelComponent,canActivate :[AuthGuard]},
  {path:'restaurant-control',component:RestaurantControlComponent, canActivate :[AuthGuard] },

  {path:'restaurant-list',component:RestaurantListComponent  },
  {path:'restaurant-control/:id',component:RestaurantPanelComponent , canActivate :[AuthGuard] },
  {path:'restaurant/:id',component:RestaurantComponent  },
  {path:'favorites-panel',component:FavoritesPanelComponent,canActivate : [AuthGuard]},
  {path:'register-restaurant',component:RegisterRestaurantComponent , canActivate :[AuthGuard] },
  {path:'footer',component:FooterComponent}  ,
  {path:'image-uploader',component:ImageUploaderComponent },
  {path:'restaurants-in-city/:city',component:RestaurantsInCityComponent },
  {path: 'cart-view-page', component : CartpageComponent, canActivate :[AuthGuard]},
  {path: 'history-1', component : HistoryComponent, canActivate : [AuthGuard]},
  {path:'homelogin',component:HomeloginComponent},
  {path:'error',component:NotFoundComponent},
  {path:'',redirectTo:'home',pathMatch:'full'}, 
  {path:'**',redirectTo:'error',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
