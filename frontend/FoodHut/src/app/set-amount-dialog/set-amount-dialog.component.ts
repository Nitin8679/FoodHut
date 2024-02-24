import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-set-amount-dialog',
  templateUrl: './set-amount-dialog.component.html',
  styleUrls: ['./set-amount-dialog.component.css']
})
export class SetAmountDialogComponent {
  constructor(
    public dialogRef:MatDialogRef<any>,
    public fb:FormBuilder
  ){}
  amountForm:FormGroup= this.fb.group({
    amount: [1, [Validators.required, Validators.min(1), Validators.pattern(/^(0|[1-9]\d*)$/)]],
  })
  get amount() {
    return this.amountForm.get('amount')
  }

  
  close(){
    this.dialogRef.close(  this.amount.value)
  }
}
