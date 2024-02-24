package com.foodapp.restrauentapp.controller;

import com.foodapp.restrauentapp.exceptions.NotFoundException;
import com.foodapp.restrauentapp.model.Delivery;
import com.foodapp.restrauentapp.model.Order;
import com.foodapp.restrauentapp.model.OrderStatus;
import com.foodapp.restrauentapp.serivce.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order-service")
public class OrderController {

    OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/cart/{customerId}")
    public ResponseEntity<?> getCartForCustomer(@PathVariable String customerId) {
        List<Order> customerCart = orderService.getCartForCustomer(customerId);

        if (!customerCart.isEmpty()) {
            return new ResponseEntity<>(customerCart, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/cart/add")
    public ResponseEntity<?> addOrderToCustomerCart(@RequestBody Order order) {
        Order addedOrder = orderService.addOrderToCustomerCart(order);
        return new ResponseEntity<>(addedOrder, HttpStatus.CREATED);
    }

    @DeleteMapping("/cart/remove/{orderId}")
    public ResponseEntity<?> removeOrderFromCustomerCart(@PathVariable String orderId) throws NotFoundException {

            boolean removed = orderService.removeOrderFromCustomerCart(orderId);
            Map<String,String> map= new HashMap<>();
            map.put("status", "true" );
            return new ResponseEntity<>( map , HttpStatus.OK);


    }

    @PutMapping("/cart/update")
    public ResponseEntity<?> updateOrderInCustomerCart(@RequestBody Order order) {
        try {
            Order updatedOrder = orderService.updateOrderInCustomerCart(order);
            return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/set/{status}")
    public  ResponseEntity<?> setOrderStatusForMultipleOrders( @PathVariable("status") String status, @RequestBody List<String> orderIds){

        return new ResponseEntity<>(  orderService.setMultipleOrderStatus( status , orderIds)  ,HttpStatus.OK);
    }

    @GetMapping("/set/{status}/{orderId}")
    public ResponseEntity<?> setOrderStatusForSingleOrder(@PathVariable("status") String status,@PathVariable("orderId") String orderId) throws NotFoundException {
        return new ResponseEntity<>( orderService.setOrderStatusForSingleOrder(orderId,status) , HttpStatus.OK );
    }

    @GetMapping("/restaurant/get/{status}/{restaurantId}")
    public ResponseEntity<?> getOrdersByStatusForRestaurant(@PathVariable("status") String status , @PathVariable("restaurantId") String restaurantId){
        return new ResponseEntity<>(  orderService.getOrdersByStatusForRestaurant(restaurantId, status  )  , HttpStatus.OK);
    }
    @GetMapping("/customer/get/{status}/{customerId}")
    public ResponseEntity<?> getOrdersByStatusForCustomer(@PathVariable("status") String status , @PathVariable("customerId") String customerId){
        return new ResponseEntity<>(  orderService.getOrdersByStatusForCustomer(customerId, status  )  , HttpStatus.OK);
    }

    @DeleteMapping("/delete/{orderId}")
    public ResponseEntity<?> permanentlyDelete(@PathVariable String orderId) throws NotFoundException {
        return new ResponseEntity<>(  orderService.deleteOrder(orderId)  ,  HttpStatus.OK);
    }
    @GetMapping("/getCartByCustomer")
    public ResponseEntity<?> getCartByCustomer(HttpServletRequest request){
        String id=(String) request.getAttribute("customerId");
        List<Order> customerCart = orderService.getCartForCustomer(id);

        if (!customerCart.isEmpty()) {
            return new ResponseEntity<>(customerCart, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(customerCart,HttpStatus.OK);
        }
    }
}
