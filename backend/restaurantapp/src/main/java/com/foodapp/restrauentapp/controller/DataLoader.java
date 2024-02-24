package com.foodapp.restrauentapp.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.foodapp.restrauentapp.model.Item;
import com.foodapp.restrauentapp.model.Restaurant;

import com.foodapp.restrauentapp.serivce.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
public class DataLoader implements ApplicationRunner {

    private final RestaurantService restaurantService;

    @Autowired
    public DataLoader(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        loadRestaurants();
        loadItems();
    }

    private void loadRestaurants() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        TypeReference<List<Restaurant>> typeReference = new TypeReference<>() {};
        InputStream inputStream = new ClassPathResource("restaurants1.json").getInputStream();
        List<Restaurant> restaurants = objectMapper.readValue(inputStream, typeReference);
        for (Restaurant restaurant : restaurants) {
            // Set a common userId
            restaurant.setUserId("gcharan2302@gmail.com");
            // Save each restaurant
            restaurantService.addRestaurant(restaurant);
        }
    }

    private void loadItems() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        TypeReference<List<Item>> typeReference = new TypeReference<>() {};
        InputStream inputStream = new ClassPathResource("items.json").getInputStream();
        List<Item> items = objectMapper.readValue(inputStream, typeReference);
        for (Item item : items) {
            // Save each item
            restaurantService.addItem(item);
        }
    }
}
