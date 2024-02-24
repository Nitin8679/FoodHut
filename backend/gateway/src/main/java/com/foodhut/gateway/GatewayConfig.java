package com.foodhut.gateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {
    @Bean
    public RouteLocator getRoutes(RouteLocatorBuilder builder){
        return builder.routes()
                .route(p->p.path("/api/auth/**").uri("http://localhost:8067/api/auth/*"))
                .route(p->p.path("/api/v1/customer/**").uri("http://localhost:8068/api/v1/customer/*"))
                .route(p->p.path("/restaurant-service/**").uri("http://localhost:8069/restaurant-service/*"))
                .route(p->p.path("/order-service/**").uri("http://localhost:8069/order-service/*"))
                .route(p->p.path("/razorpay/**").uri("http://localhost:8045/razorpay/*"))
                .route(p->p.path("/image/**").uri("http://localhost:6000/restaurants/*")).build();
    }
}
