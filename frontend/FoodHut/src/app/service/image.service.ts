import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable ,of } from 'rxjs';
import { Metadata } from '../model/Metadata';
import { Connection } from './Connection';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(
    private http:HttpClient
  ) { }

  // imagesUrl="http://localhost:9999/image"

  imagesUrl = `${Connection.baseUrl}/image`

  //metadata needs to be fully filled before sending
  uploadImage(imageFile:File , metadata:Metadata):Observable<boolean>  {
    
    if(imageFile.type !== "image/png"){
      throw new Error("incorrect filetype");
    }
    const imageFormData = new FormData();
    imageFormData.append('image', imageFile ,this.removeExtension(imageFile.name) )
    
    imageFormData.append('metadata',JSON.stringify( metadata ));

    return this.http.post<boolean>( `${this.imagesUrl}/upload/one`, imageFormData );

  }

  


  //deprecated
  //returns url string
  downloadImageByFileName(filename: string): Observable<string> {
    return this.http.get(`${this.imagesUrl}/download/${filename}`, { responseType: 'arraybuffer' }).pipe(
      map((res: ArrayBuffer) => URL.createObjectURL(new Blob([res]))),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
      );
      
    }
  
  //use this one instead
  //returns url string
  downloadAssociatedImage(objectId:string):Observable<string>{
    return this.http.get(`${this.imagesUrl}/download/imageof/${objectId}`, {responseType:'arraybuffer'}).pipe(
      map((res:ArrayBuffer) =>URL.createObjectURL (new Blob([res]) ) ),
      catchError(  (error:any)=>{
        // console.error(error);
        return of('');
      } )
    )
  }





    
    
    
    
    serve():Observable<any>{
      return this.http.get(`${this.imagesUrl}/serve`)
  }
  removeExtension(filename: string): string {
    // Split the filename by the dot (.)
    const parts = filename.split('.');
    // Remove the last part (extension) and join the remaining parts
    const nameWithoutExtension = parts.slice(0, -1).join('.');

    return nameWithoutExtension;
}
}
