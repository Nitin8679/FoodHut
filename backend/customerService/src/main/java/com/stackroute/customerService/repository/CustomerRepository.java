package com.stackroute.customerService.repository;

import com.stackroute.customerService.domain.Customer;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
//import org.springframework.data.mongodb.repository.Modifying;





public interface CustomerRepository extends MongoRepository<Customer,String> {
    @Query("{ _id: ?0 }")
    @Update("{$set: { status: ?1 }}")
    void updateStatusById(String id,String status);

//    @Modifying
    @Query("{ _id: ?0 }")
    @Update("{$push: { favoriteItems: ?1 }}")
    void addFavoriteItem(String customerId, String itemId);

//    @Modifying
    @Query("{ _id: ?0 }")
    @Update("{$pull: { favoriteItems: ?1 }}")
    void removeFavoriteItem(String customerId, String itemId);

//    @Modifying
    @Query("{ _id: ?0 }")
    @Update("{$push: { favoriteRestaurants: ?1 }}")
    void addFavoriteRestaurant(String customerId, String restaurantId);

//    @Modifying
    @Query("{ _id: ?0 }")
    @Update("{$pull: { favoriteRestaurants: ?1 }}")
    void removeFavoriteRestaurant(String customerId, String restaurantId);


}
