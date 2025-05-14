package com.foodhut.gateway;

import java.util.Arrays;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.reactive.CorsConfiguration;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.reactive.CorsWebFilter;

@Configuration
public class GatewayConfig {

  @Bean
  public RouteLocator getRoutes(RouteLocatorBuilder builder) {
    return builder.routes()
      .route(p -> p.path("/api/auth/**")
                   .uri("http://localhost:8067/api/auth/"))
      .route(p -> p.path("/api/v1/customer/**")
                   .uri("http://localhost:8068/api/v1/customer/"))
      .route(p -> p.path("/restaurant-service/**")
                   .uri("http://localhost:8069/restaurant-service/"))
      .route(p -> p.path("/order-service/**")
                   .uri("http://localhost:8069/order-service/"))
      .route(p -> p.path("/razorpay/**")
                   .uri("http://localhost:8045/razorpay/"))
      .route(p -> p.path("/image/**")
                   .uri("http://localhost:6000/restaurants/"))
      .build();
  }

  @Bean
  public CorsWebFilter corsWebFilter() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(Arrays.asList("https://your-frontend.vercel.app"));
    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(Arrays.asList("*"));
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);

    return new CorsWebFilter(source);
  }
}
