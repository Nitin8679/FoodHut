import { AbstractControl, ValidationErrors } from '@angular/forms';

export function priceFormat(control: AbstractControl): ValidationErrors | null {
  const price: string = control.value;
    const numericPrice = parseInt(price, 10);

    if(Number.isNaN( numericPrice ) ){
        return null;
    }

    if (numericPrice < 0) {
      return { invalidPriceFormat: true };
    }


  return null;


}
