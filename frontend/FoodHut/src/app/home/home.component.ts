import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from '../model/Customer';
import { DecodedTokenObject } from '../model/DecodedTokenObject';
import { KeyType } from '../model/KeyType';
import { FavoritesService } from '../service/favorites.service';
import { PopupService } from '../service/popup.service';
import { RoutesService } from '../service/routes.service';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private intervalId: any;
  private navigationSubscription: Subscription;
  currentImageIndex = 0;
  isLoggedIn = false;
  currentUser: Customer;
  favoriteRestaurants: string[] = [];
  favoriteItems: string[] = [];

 imageUrls: string[] = [
  
  'https://media.cntraveler.com/photos/642c841a4fb47515bb913448/16:9/w_1920,c_limit/Juns_group%20shot%20-%20dinner.jpg',
  'https://media.tatler.com/photos/6141c876239701554441c292/16:9/w_2580,c_limit/Copyright_Cafe-Monico_19-tatler-8nov16-pr_b.jpg',
  'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/7/w/m/p76290-15797762035e2978cbe869a.jpg?tr=tr:n-large',
  'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Vwd2s2MTY2MTU3Ny13aWtpbWVkaWEtaW1hZ2Uta293YXBlZWouanBn.jpg',
  'https://wallpaperbat.com/img/729584-restaurants-wallpaper-top-free-restaurants-background.jpg',
  'https://media.cntraveller.com/photos/64c8f3818fda363db57f2707/4:3/w_2664,h_1998,c_limit/Louis-Vuitton-resto-at-White-1921-(1)-St-Tropez-aug23-pr.jpg',
  'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
  'https://images7.alphacoders.com/129/1290221.jpg',
  'https://wallpapers.com/images/featured/4k-food-pictures-27rzp99978gxc715.jpg',
  'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1704067200&semt=ais',
  'https://assets.architecturaldigest.in/photos/65893f2e42bd39323509ba25/16:9/w_1616,h_909,c_limit/Untitled%20design%20(86).png',
  'https://images2.alphacoders.com/101/1014970.jpg',
  'https://images3.alphacoders.com/101/1013298.jpg',
  'https://wallpapersmug.com/download/3840x2400/b67e3e/pizza-slices-food.jpg',
  'https://c4.wallpaperflare.com/wallpaper/869/719/717/cuisine-food-india-indian-wallpaper-preview.jpg',
  'https://assets.gqindia.com/photos/64f1da6829ae1dbbe3d61789/16:9/w_1920,c_limit/Dosa1.jpg'
 
  
  

  // ... other image URLs
];

  constructor(
    private routesService: RoutesService,
    private tokenService: TokenService,
    private userService: UserService,
    private popup: PopupService,
    private favoritesService: FavoritesService,
    // private renderer: Renderer2,
    private router: Router
  ) {
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        clearInterval(this.intervalId);
      }
    });
  }

  ngOnInit(): void {
    this.shuffleImages();
    this.startCarouselAnimation();

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

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    this.navigationSubscription.unsubscribe();
  }

  exploreFavorites(): void {
    // Logic for exploring favorite items and restaurants
  }


  private startCarouselAnimation(): void {
    this.intervalId = setInterval(() => {
      this.changeImage();
    }, 3000);
  }

  private changeImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
  }


  private shuffleImages(): void {
    for (let i = this.imageUrls.length - 1; i > 0; i--) {
      // Cache `Math.random()` for efficiency
      const randomIndex = Math.floor(Math.random() * (i + 1));
  
      // Optimized swap using destructuring and a temporary variable
      const temp = this.imageUrls[i];
      this.imageUrls[i] = this.imageUrls[randomIndex];
      this.imageUrls[randomIndex] = temp;
    }
  }
  
  
  favoritesBtn(){
    this.routesService.favoritesPanelRoute();
  }
  resturantLocationBtn(){
    this.routesService.restaurantsInCityRoute(this.currentUser.address.city);
  }
}
