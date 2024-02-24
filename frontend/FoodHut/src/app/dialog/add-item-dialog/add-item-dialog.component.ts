import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { priceFormat } from 'src/app/validator/priceFormat';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css']
})
export class AddItemDialogComponent implements OnInit{

  constructor(
    public dialogRef:MatDialogRef<any>,
    public fb:FormBuilder,
  ){}

  ngOnInit(): void {
  
    
  }

  itemForm:FormGroup = this.fb.group(
    {
      name:['',[Validators.required]],
      price:['',[
        Validators.required, 
        Validators.pattern( /^-?\d*\.?\d+$/),
        priceFormat      
      ]
    ],
      category:['',[Validators.required]],
      description:['',[Validators.required,Validators.maxLength(100)]],
    }
  )

  get name(){
    return this.itemForm.get('name');
  }
  get price(){
    return this.itemForm.get('price');
  }
  get category(){
    return this.itemForm.get('category');
  }
  get description(){
    return this.itemForm.get('description');
  }


  close(submit:boolean){
    const newItem = {...this.itemForm.value};
    if(submit){
      this.dialogRef.close(newItem)
    }else{
      this.dialogRef.close(submit);
    }
  }




}
