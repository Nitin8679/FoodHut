package com.foodapp.restrauentapp.serivce;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="customer-service",url = "localhost:8068")
public interface CustomerProxy {

//    @GetMapping("/api/v1/customer/popularity/{type}")
//    public ResponseEntity<?>  getPopularityRankings(@PathVariable("type")  String type);
    @GetMapping("/api/v1/customer/favorite/get/{type}")
    public  ResponseEntity<?> getFavorites(@PathVariable("type") String type );
}
