package com.foodapp.restrauentapp.repository;


import com.foodapp.restrauentapp.model.Restaurant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface RestaurantRepository extends MongoRepository<Restaurant, String> {
    List<Restaurant> findByUserId(String userId);
    List<Restaurant> findByAddress_State(String state);
    List<Restaurant> findByAddress_City(String city);

    @Query("{_id:{$in: ?0}}")
    List<Restaurant> findByIds(List<String> ids);

}
