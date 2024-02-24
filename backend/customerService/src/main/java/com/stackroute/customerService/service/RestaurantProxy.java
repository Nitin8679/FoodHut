package com.stackroute.customerService.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name="restrauent-service",url = "localhost:8069/restaurants")
public interface RestaurantProxy {


}
