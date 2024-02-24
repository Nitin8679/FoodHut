import { AbstractControl,FormGroup,ValidationErrors,ValidatorFn } from "@angular/forms";


export function matchConfirmPassword(group:AbstractControl):ValidationErrors | null{
    const password = group.get('password')?.value
    const confirmPassword = group.get('confirmPassword')?.value

    let passWordMatch:boolean = (password ===  confirmPassword);
    
    if(!passWordMatch){
        return  { passwordMismatch : true };
    }

    return null;
}

