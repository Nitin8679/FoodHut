package com.foodapp.restrauentapp.repository;

import com.foodapp.restrauentapp.model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;

import java.util.List;

public interface ItemRepository extends MongoRepository<Item,String> {

    List<Item> findByRestaurantId(String restaurantId);

    @Query("{_id:{$in: ?0}}")
    List<Item> findByIds(List<String> ids);
}
