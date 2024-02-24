import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './header/header.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';

import { RegisterRestaurantComponent } from './register-restaurant/register-restaurant.component';
import { RestaurantPanelComponent } from './restaurant-panel/restaurant-panel.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';

import { FooterComponent } from './footer/footer.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RestaurantControlComponent } from './restaurant-control/restaurant-control.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { RestaurantHistoryComponent } from './restaurant-history/restaurant-history.component';
import { RestaurantOrdersComponent } from './restaurant-orders/restaurant-orders.component';
import { ItemComponent } from './item/item.component';
import { AddItemDialogComponent } from './dialog/add-item-dialog/add-item-dialog.component';
import { AlertDialogComponent } from './dialog/alert-dialog/alert-dialog.component';
import { OrderConfirmDialogComponent } from './dialog/order-confirm-dialog/order-confirm-dialog.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { HistoryComponent } from './history/history.component';
import { CustomerHistoryComponent } from './customer-history/customer-history.component';
import { AccountComponent } from './account/account.component';
import { LocationListComponent } from './location-list/location-list.component';
import { RestaurantsInLocationComponent } from './restaurants-in-location/restaurants-in-location.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { MenuPanelComponent } from './menu-panel/menu-panel.component';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { SetAmountDialogComponent } from './set-amount-dialog/set-amount-dialog.component';
import { CartOrderComponent } from './cart-order/cart-order.component';
import { CityListComponent } from './city-list/city-list.component';
import { FavoriteRestaurantsComponent } from './favorite-restaurants/favorite-restaurants.component';
import { FavoriteItemsComponent } from './favorite-items/favorite-items.component';
import { RestaurantCard2Component } from './restaurant-card2/restaurant-card2.component';
import { RestaurantsInCityComponent } from './restaurants-in-city/restaurants-in-city.component';
import { FavoritesPanelComponent } from './favorites-panel/favorites-panel.component';
import { OrderCardComponent } from './order-card/order-card.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { QuitConfirmDialogComponent } from './quit-confirm-dialog/quit-confirm-dialog.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { HomeloginComponent } from './homelogin/homelogin.component';




@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    NavigationComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    RegisterRestaurantComponent,
    RestaurantPanelComponent,
    RestaurantListComponent,
    FooterComponent,
    ImageUploaderComponent,
    UploadImageComponent,
    RestaurantControlComponent,
    RestaurantDetailsComponent,
    RestaurantMenuComponent,
    RestaurantHistoryComponent,
    RestaurantOrdersComponent,
    ItemComponent,
    AddItemDialogComponent,
    AlertDialogComponent,
    OrderConfirmDialogComponent,
    ItemCardComponent,
    NotFoundComponent,
    CartComponent,
    DeliveryComponent,
    HistoryComponent,
    CustomerHistoryComponent,
    AccountComponent,
    LocationListComponent,
    RestaurantsInLocationComponent,
    RestaurantComponent,
    MenuPanelComponent,
    RestaurantCardComponent,
    MenuItemComponent,
    SetAmountDialogComponent,
    CartOrderComponent,
    CityListComponent,
    FavoriteRestaurantsComponent,
    FavoriteItemsComponent,
    RestaurantCard2Component,
    RestaurantsInCityComponent,
    FavoritesPanelComponent,
    OrderCardComponent,
    ConfirmationDialogComponent,
    QuitConfirmDialogComponent,
    CartpageComponent,
    HomeloginComponent
  ],
  imports: [
    MatExpansionModule,
    MatChipsModule,
    MatDialogModule,
    MatTabsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatSelectModule,
    MatOptionModule,
    MatStepperModule,
    MatInputModule,    
    ReactiveFormsModule,
    MatCardModule,    
    MatTooltipModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule,
    DragDropModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
