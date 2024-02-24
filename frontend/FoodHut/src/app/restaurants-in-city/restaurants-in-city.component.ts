import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../model/Item';
import { Restaurant } from '../model/Restaurant';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-restaurants-in-city',
  templateUrl: './restaurants-in-city.component.html',
  styleUrls: ['./restaurants-in-city.component.css']
})
export class RestaurantsInCityComponent implements OnInit, OnChanges{

  constructor(
    private activatedRoute:ActivatedRoute,
    private restaurantService:RestaurantService,
  ){}

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(
      res=>{
        this.city = res.get('city')
        console.log(this.city);



        this.restaurantService.getRestaurantByCity(this.city).subscribe(
          res=>{
            this.restaurantsInLocation = res;

            this._restaurantsInLocation = [... this.restaurantsInLocation]

            this.setUpCategories();



          },
          err=>{
            console.log(err);
            
          }
        )
        
      }
    )
  }
  ngOnChanges(changes: SimpleChanges): void {

  }

  city!:string;

  restaurantsInLocation:Restaurant[];
  _restaurantsInLocation:Restaurant[];
  tempRestaurants:Restaurant[];


  categories:Set<string>  = new Set();
  query:string;




  setUpCategories(){
    

    this._restaurantsInLocation.forEach(
      restaurant=>{
        if(restaurant.cuisineType){
          this.categories.add( restaurant.cuisineType );
        }
      }
    )

  }




  searchItems(event:any){


    if(this.query === ''){
      this.restaurantsInLocation = []
      this.restaurantsInLocation = [...this._restaurantsInLocation]
      return;
  
    }
    // console.log(this.query);

    this.restaurantsInLocation = [];
    this.restaurantsInLocation = [...this._restaurantsInLocation]
    

    const filteredItems:Restaurant[] = this.restaurantsInLocation.filter( restaurant=>{
      return restaurant.name?.toLocaleLowerCase().includes( this.query.toLowerCase() )
    } );
    // console.log( filteredItems );

    this.restaurantsInLocation = []
    this.restaurantsInLocation = [...filteredItems]
    
  }

  sortByCategory(category:string){
    this.restaurantsInLocation = [];
    this.restaurantsInLocation = [...this._restaurantsInLocation]
    
    
    if(category.match('ALL')){  
      return;
    }

    // console.log(category);


    const filteredItems:Restaurant[] = this.restaurantsInLocation.filter(
      restaurant=>{
        return restaurant.cuisineType?.match(  category );
      }
    )

    this.restaurantsInLocation = []
    this.restaurantsInLocation = [... filteredItems];
    
  }
 
  sortByPopularity(){

  }




}
