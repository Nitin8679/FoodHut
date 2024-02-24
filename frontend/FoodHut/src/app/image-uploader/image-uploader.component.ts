import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Image } from '../model/Image';
import { Metadata } from '../model/Metadata';
import { ImageServiceService } from '../service/image-service.service';
import { PopupService } from '../service/popup.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent {


  constructor(
    private fb:FormBuilder,
    private imageService:ImageServiceService,
    private popupService:PopupService
  ){
     
  }

  
  setupImage(){

  }
  
  selectedFile:File  ;
  image:any;
  fileToDownload = new FormControl('');

  metaData:Metadata={}


  upload(){
    this.metaData.imageOf = "random item";

    
    this.imageService.uploadImage2( this.selectedFile , this.metaData ).subscribe(
      res=>{
        this.popupService.openSnackBar("upload success");
        
      },
      err=>{
        this.popupService.openSnackBar("upload failed");
      }
    )
  }


  onFileChanged(event:any){
    this.selectedFile = event.target.files[0];
    this.metaData.fileType = this.selectedFile.type;

    
  }
  check(){

    console.log("check");
    
    console.log(this.fileToDownload.value);

 
    
  }



  download(){
    const filename:string  = this.fileToDownload.value as string;

    this.imageService.downloadImageByFileName(filename).subscribe(
      (imageUrl:string)=>{
        this.image= imageUrl;
      },err=>{
        console.log(err);
        
      }
    )

  }
  removeExtension(filename: string): string {
    // Split the filename by the dot (.)
    const parts = filename.split('.');
    // Remove the last part (extension) and join the remaining parts
    const nameWithoutExtension = parts.slice(0, -1).join('.');

    return nameWithoutExtension;
}
}
