package com.stackroute.customerService.controller;


import com.stackroute.customerService.domain.AuthRequest;
import com.stackroute.customerService.domain.Customer;
import com.stackroute.customerService.exception.AlreadyExistsException;
import com.stackroute.customerService.exception.NotFoundException;
import com.stackroute.customerService.exception.ServiceSynchronizationException;
import com.stackroute.customerService.service.CustomerService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/v1/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Customer customer) throws AlreadyExistsException, ServiceSynchronizationException {
        return new ResponseEntity<>(  customerService.registerCustomer(customer) ,  HttpStatus.CREATED);

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) throws NotFoundException, ServiceSynchronizationException {
        return customerService.login(authRequest);
    }
    @GetMapping("/details")
    public ResponseEntity<?> getDetails(HttpServletRequest request) throws NotFoundException {
        String id = (String) request.getAttribute("customerId");
        return new ResponseEntity<>( customerService.getCustomerDetails( id)  , HttpStatus.OK);
    }
    @PutMapping("/edit")
    public ResponseEntity<?> editAccount(@RequestBody Customer customer) throws NotFoundException {
        return new ResponseEntity<>(  customerService.editAccount(customer)  ,  HttpStatus.OK);
    }
    @GetMapping("/get/{customerId}")
    public ResponseEntity<?> getCustomer(@PathVariable String customerId) throws NotFoundException {
        return new ResponseEntity<>( customerService.getCustomerDetails( customerId )  , HttpStatus.OK);
    }
    @GetMapping("/deactivate/{customerId}")
    public ResponseEntity<?> deactivateAccount(@PathVariable String customerId) throws NotFoundException {
        return new ResponseEntity<>( customerService.deactivateAccount(customerId)  ,HttpStatus.OK);
    }

    //favorites
    @GetMapping("/favorite/restaurant/add/{customerId}/{restaurantId}")
    public ResponseEntity<?> addRestaurantToFavorite(@PathVariable("customerId") String customerId ,@PathVariable("restaurantId") String restaurantId  ) throws NotFoundException {
        return  new ResponseEntity<>( customerService.addFavoriteRestaurant(restaurantId,customerId) ,HttpStatus.OK);
    }

    @DeleteMapping("/favorite/restaurant/remove/{customerId}/{restaurantId}")
    public ResponseEntity<?> removeRestaurantFromFavorite(@PathVariable("customerId") String customerId ,@PathVariable("restaurantId") String restaurantId  ) throws NotFoundException {
        return  new ResponseEntity<>( customerService.removeFavoriteRestaurant(restaurantId,customerId) ,HttpStatus.OK);
    }

    @GetMapping("/favorite/item/add/{customerId}/{itemId}")
    public ResponseEntity<?> addItemToFavorite(@PathVariable("customerId") String customerId ,@PathVariable("itemId") String itemId  ) throws NotFoundException {
        return  new ResponseEntity<>( customerService.addFavoriteItem(itemId ,customerId) ,HttpStatus.OK);
    }
    @DeleteMapping("/favorite/item/remove/{customerId}/{itemId}")
    public ResponseEntity<?> removeItemFromFavorite(@PathVariable("customerId") String customerId ,@PathVariable("itemId") String itemId  ) throws NotFoundException {
        return  new ResponseEntity<>( customerService.removeFavoriteItem(itemId,customerId ) ,HttpStatus.OK);
    }

    @GetMapping("/favorite/get/{type}")
    public  ResponseEntity<?> getFavorites(@PathVariable("type") String type ){

        return new ResponseEntity<>( customerService.getPopularity(type)  , HttpStatus.OK);
    }
}
