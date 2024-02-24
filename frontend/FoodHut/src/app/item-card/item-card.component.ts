import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from '../model/Item';
import { ImageService } from '../service/image.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent  implements OnInit,OnChanges{


  constructor(
    private imageService:ImageService,
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if(this.item){

      this.imageService.downloadAssociatedImage( this.item.id ).subscribe(
        res=>{
          if(!res){
            this.imageUrl = ''
          }
            this.imageUrl = res;
        },
        err=>{
          // console.log(err);
          this.imageUrl = ''
          
        }
      )



    }
  }

  ngOnInit(): void {
  }

  @Input()
  item!:Item;


  imageUrl!:string;
  

}
