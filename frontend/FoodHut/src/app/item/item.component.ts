import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../model/Item';
import { Metadata } from '../model/Metadata';
import { ImageService } from '../service/image.service';
import { MenuService } from '../service/menu.service';
import { PopupService } from '../service/popup.service';
import { priceFormat } from '../validator/priceFormat';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit,OnChanges{

  constructor(
    private fb:FormBuilder,
    private imageService:ImageService,
    private popupService:PopupService,
    private menuService:MenuService
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.lastChanges = changes;
    console.log(changes);
    
    if(this.selectedItem){

      this.imageService.downloadAssociatedImage(  this.selectedItem.id  ).subscribe(
        res=>{
          if(!res){
            this.imageUrl=''
            return;
          }
          this.imageUrl = res;
          this._imageUrl = res;
        },
        err=>{
          this.imageUrl = '';
          // this.popupService.openSnackBar("image could  not be  downloaded")
          // console.log(err);
          // console.error(err);
          
          
        }
      )

      this.itemForm= this.fb.group(
      
        {
          name:[this.selectedItem.name ,  [Validators.required] ],
          category:[ this.selectedItem.category , [Validators.required]  ],
          price:[this.selectedItem.price ,  [
            Validators.required  ,
            Validators.pattern( /^-?\d*\.?\d+$/),
            priceFormat
           ] 
           
          ],
          description:[ this.selectedItem.description , [Validators.required ,  Validators.maxLength(200)   ]  ],
        }
      
    )


    
    }else{
      this.imageUrl=''
      this._imageUrl=''
    }



    this.selectedImage = null;
    
  }

  ngOnInit(): void {
  
    console.log("selected item: ", this.selectedItem);    
    
    
  }


  @Input()
  selectedItem!:Item;

  @Output()
  itemEdit = new EventEmitter();
  
  

  isEditing=false;
  isEditingImage=false;
  selectedImage!:File;
  imageUrl: string | ArrayBuffer | null = '';
  _imageUrl: string | ArrayBuffer | null = '';

  lastChanges:SimpleChanges ={};

  

  itemForm:FormGroup= this.fb.group(
    {
      name:['', [Validators.required] ],
      category:['',[Validators.required]],
      price:['',[Validators.required , Validators.pattern( /^\d*\.?\d+$/ ) ]],
      description:['',[Validators.required ,  Validators.maxLength(100)   ] ],
    }
  );


  get name(){
    return this.itemForm.get('name');
  }
  get category(){
    return this.itemForm.get('category');
  }
  get price(){
    return this.itemForm.get('price');
  }
  get description(){
    return this.itemForm.get('description');
  }




  edit(){
    this.isEditing= true;
  }

  confirmDetails(){
    this.isEditing = false;
    // console.log(this.itemForm.value);

    const updatedItem:Item = {... this.selectedItem,...this.itemForm.value}

    
    console.log(updatedItem);
    
    // return;
    
    this.menuService.updateItem( updatedItem ).subscribe(
      res=>{
        console.log(res);
        this.popupService.openSnackBar("item details have been upadated")
      },
      err=>{
        console.log(err);
        this.popupService.openSnackBar("update failed")
        
      }
    )

  }

  onFileChanged(event: any): void {
    this.selectedImage = event.target.files[0];

    if (this.selectedImage) {
      // Display the selected image
      this.displayImage();
    }
  }


  
  displayImage(): void {
    // Create a FileReader to read the selected image
    const reader = new FileReader();

    reader.onload = (e: any) => {
      // Set the imageUrl to the base64 representation of the selected image
      this.imageUrl = e.target.result;
    };

    // Read the selected image as data URL
    reader.readAsDataURL(this.selectedImage!);
  }

  openFileInput(){
    const fileInput = document.getElementById('fileInputForItem') as HTMLInputElement;
    if(fileInput){
      fileInput.click();
    }
  }

  uploadImage(){
  
    this.isEditingImage = false;

    if(!this.selectedImage){

      this.popupService.openSnackBar("file not selected")
      return;
    }
    
    const newMetadata:Metadata ={
      imageType:"ITEM",
      imageOf:this.selectedItem.id,
      fileType: this.selectedImage.type
    }
    
    
    console.log(newMetadata);
    
    this.imageService.uploadImage( this.selectedImage ,newMetadata ).subscribe(
      res=>{

        this.popupService.openSnackBar("image successfully uploaded");
        this.itemEdit.emit();
        // this.ngOnChanges(this.lastChanges);
      },
      err=>{
        this.popupService.openSnackBar("upload failed");

      }
    )


    // this.imageService.uploadImage( ).subscribe()


  }

  cancelImageEdit(){
    this.imageUrl = this._imageUrl;
    this.isEditingImage = false;
  }
  cancelDetailsEdit(){
    this.isEditing = false;
    this.ngOnChanges(this.lastChanges); 
  }

  deleteItem(itemId:string){
    console.log("delete item "+itemId);
    this.menuService.deleteItem(itemId).subscribe(
      res=>{
        console.log(res);
        // this.ngOnChanges(this.lastChanges)
        this.itemEdit.emit()
        this.popupService.openSnackBar("item removed from menu")
      },
      err=>{
        
        this.popupService.openSnackBar("removal failed")
      }
    )
    

  }





}
