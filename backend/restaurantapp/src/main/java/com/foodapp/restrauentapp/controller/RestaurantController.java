package com.foodapp.restrauentapp.controller;


import com.foodapp.restrauentapp.exceptions.NotFoundException;
import com.foodapp.restrauentapp.model.*;
import com.foodapp.restrauentapp.serivce.RestaurantService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/restaurant-service")
public class RestaurantController {


    private RestaurantService restaurantService;

    @Autowired
    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping("/serve")
    public ResponseEntity<?> serve(){
        Map<String,String> map = new HashMap<>();
        map.put("msg","served");
        return new ResponseEntity<>(map ,HttpStatus.OK);
    }


    //############ restaurants ############
    @PostMapping("/restaurant/register")
    public ResponseEntity<?> addRestaurant(@RequestBody Restaurant restaurant){
        return new ResponseEntity<>(restaurantService.addRestaurant( restaurant ) ,HttpStatus.CREATED);

    }
    @GetMapping("/restaurant/{restaurantId}")
    public  ResponseEntity<?> getRestaurant(@PathVariable String restaurantId) throws NotFoundException {
        return new ResponseEntity<>(  restaurantService.getRestaurant( restaurantId ) , HttpStatus.OK);
    }

    @GetMapping("/restaurant/all")
    public  ResponseEntity<?> getAllRestaurants(){
        return new ResponseEntity<>(  restaurantService.getAllRestaurants(), HttpStatus.OK);
    }

    @GetMapping("/restaurant/all/user")
    public  ResponseEntity<?> getRestaurantsForUser(HttpServletRequest request){
        System.out.println("get restaurants for user");
        String customerId =(String) request.getAttribute("customerId");
//        System.out.println(customerId);
        return new ResponseEntity<>( restaurantService.getRestaurantsForUser(customerId) ,HttpStatus.OK);

    }
    @PutMapping("/restaurant/update")
    public  ResponseEntity<?> updateRestaurant(@RequestBody  Restaurant restaurant) throws NotFoundException {
        return new ResponseEntity<>(  restaurantService.updateRestaurant(restaurant),HttpStatus.OK);
    }

    @DeleteMapping("/restaurant/remove/{restaurantId}")
    public  ResponseEntity<?> removeRestaurant(@PathVariable String restaurantId) throws NotFoundException {
        return new ResponseEntity<>(  restaurantService.removeRestaurant(restaurantId) ,HttpStatus.OK);
    }

    @GetMapping("/restaurant/state/{state}")
    public  ResponseEntity<?> getRestaurantsByState(@PathVariable String state){
        return new ResponseEntity<>(  restaurantService.getRestaurantsByState(state) , HttpStatus.OK );
    }
    @GetMapping("/restaurant/city/{city}")
    public  ResponseEntity<?> getRestaurantsByCity(@PathVariable String city){
        return new ResponseEntity<>(  restaurantService.getRestaurantsByCity(city) , HttpStatus.OK );
    }
    @PostMapping("/restaurant/get/byId")
    public  ResponseEntity<?> getRestaurantsByIds(@RequestBody List<String> restaurantIds){
        return new ResponseEntity<>(  restaurantService.getRestaurantByIds(  restaurantIds ) , HttpStatus.OK );
    }


    //############ menu ############
    @PostMapping("/menu/add")
    public ResponseEntity<?> addItemToMenu(@RequestBody Item item){
        return new ResponseEntity<>(  restaurantService.addItem(item) , HttpStatus.CREATED);
    }
    @GetMapping("/menu/{restaurantId}")
    public ResponseEntity<?> getMenuForRestaurant(@PathVariable String restaurantId) throws NotFoundException {
        return new ResponseEntity<>(  restaurantService.getMenu(restaurantId) , HttpStatus.OK);
    }
    @PutMapping("/menu/update")
    public ResponseEntity<?> updateItem(@RequestBody Item item) throws NotFoundException {
        return   new ResponseEntity<>( restaurantService.updateItem(item) ,HttpStatus.OK);
    }
    @DeleteMapping("/menu/delete/{itemId}")
    public ResponseEntity<?> deleteItem(@PathVariable String itemId ) throws NotFoundException {
        return   new ResponseEntity<>( restaurantService.removeItem(itemId) ,HttpStatus.OK);
    }
    @PostMapping("/menu/items")
    public ResponseEntity<?> getCartItems(@RequestBody List<String> ids){
        return new ResponseEntity<>(  restaurantService.getItemsByIds(ids) ,HttpStatus.OK);
    }
    @GetMapping("/menu/item/{itemId}")
    public ResponseEntity<?> getItemDetails(@PathVariable String itemId) throws NotFoundException {
        return new ResponseEntity<>(restaurantService.getItemById(itemId) , HttpStatus.OK );
    }

    //popularity

    @GetMapping("/popular/city")
    public  ResponseEntity<?> getPopularityByCities(){
        return new ResponseEntity<>( restaurantService.getPopularCities()  , HttpStatus.OK );
    }



}
