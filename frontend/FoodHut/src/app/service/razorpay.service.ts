import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

declare var Razorpay: any;
@Injectable({
  providedIn: 'root'
})
export class RazorpayService {

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {}
  // baseUrl = 'http://localhost:8045/razorpay/create-order'
  


  
  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return _window();
    }
  }
  
  // initiatePayment() {
  //   const rzp = new Razorpay(Option);
  //   console.log(rzp);
  //   rzp.open();
    
  //   rzp.on('payment.success', (response: any) => {
  //     console.log("Payment successful!");
  //   });
    

  //   rzp.on('payment.error', (error: any) => {
  //     // errorCallback(error);
  //     console.log("error payment from razorpay");
  //   });
  // }
  
}
function _window(): any {
  // return the global native browser window object
  return window;
}