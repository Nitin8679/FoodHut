import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Metadata } from '../model/Metadata';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(
    private http:HttpClient
  ) { }

  imagesUrl="http://localhost:9999/image"
  uploadImage(data:any):Observable<any>{
    return this.http.post(`${this.imagesUrl}/upload`,data);
  }

  uploadImage2(imageFile:File , metadata:Metadata):Observable<boolean>  {
    if(imageFile.type !== "image/png"){
      throw new Error("incorrect filetype");
    }
    const imageFormData = new FormData();
    imageFormData.append('image', imageFile ,this.removeExtension(imageFile.name) )
    imageFormData.append('metadata',JSON.stringify( metadata ));

    return this.http.post<boolean>( `${this.imagesUrl}/upload`, imageFormData );

  }

  downloadImage(filename:string){
    return this.http.get( `${this.imagesUrl}/download/${filename}`, {responseType: 'arraybuffer'} );
  }


  downloadImageByFileName(filename: string): Observable<string> {
    return this.http.get(`${this.imagesUrl}/download/${filename}`, { responseType: 'arraybuffer' }).pipe(
      map((res: ArrayBuffer) => URL.createObjectURL(new Blob([res]))),
      catchError((error: any) => {
        console.error(error);
        throw error;
      })
    );
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
