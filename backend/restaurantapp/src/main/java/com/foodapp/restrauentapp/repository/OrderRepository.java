package com.foodapp.restrauentapp.repository;

import com.foodapp.restrauentapp.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order,String> {
    List<Order> findByCustomerId(String customerId);
    List<Order> findByRestaurantId(String restaurantId);
    List<Order> findByCustomerIdAndStatus(String customerId,String status);

    List<Order> findByRestaurantIdAndStatus(String restaurantId,String status);

    List<Order> findByRestaurantIdAndDeliveryId(String restaurantId,String deliveryId);
    List<Order> findByCustomerIdAndDeliveryId(String customerId,String deliveryId);
    List<Order> findByStatus(String status);

    List<Order> findByDeliveryId(String deliveryId);


    @Query("{ _id: ?0 }")
    @Update("{$set: { status: ?1 }}")
    void updateStatusById(String id,String status);

    @Query("{_id:{$in: ?0}}")
    @Update("{$set: { status: ?1 }}")
    void updateStatusForMultipleOrders( List<String> oderIds,String status);

    @Query("{_id:{$in: ?0}}")
    List<Order> findByOrderIds(List<String> orderIds);

    @Query("{ customerId: ?0 }")
    @Update("{$set: { status: ?1 }}")
    void updateStatusByCustomerId(String id,String status);


    @Query("{ restaurantId: ?0 }")
    @Update("{$set: { status: ?1 }}")
    void updateStatusByRestaurantId(String id,String status);

    @Query("{ deliveryId: ?0 }")
    @Update("{$set: { status: ?1 }}")
    void updateStatusByDeliveryId(String deliveryId,String status);




}
