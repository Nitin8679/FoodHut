package com.foodapp.restrauentapp.serivce;

import com.foodapp.restrauentapp.exceptions.NotFoundException;
import com.foodapp.restrauentapp.model.Delivery;
import com.foodapp.restrauentapp.model.Order;


import java.util.List;

public interface OrderService {

    //############## customer side ##############
    public Order addOrderToCustomerCart(Order order);
    public boolean removeOrderFromCustomerCart(String orderId) throws NotFoundException;
    public Order updateOrderInCustomerCart(Order order) throws NotFoundException;

    //get pending orders
    public List<Order> getCartForCustomer(String customerId);
    //sets delivery status
    public Delivery processOrders(List<String> orders) throws NotFoundException;

    public boolean deleteOrder(String orderId) throws NotFoundException;

    public List<Order> setMultipleOrderStatus(String orderStatus, List<String> orderIds);
    public List<Order> getOrdersByStatusForCustomer(String customerId, String orderStatus);

    public Order setOrderStatusForSingleOrder(String orderId, String status) throws NotFoundException;

    public List<Order> getOrdersByStatusForRestaurant(String restaurantId, String orderStatus);



    //not using

    public Delivery completeDelivery(String deliveryId) throws NotFoundException;

    //get processing/ confirmed / completed orders
    public List<Delivery>  getDeliveriesByStatusForCustomer(String customerId, String orderStatus);







    //############## restaurant side ##############
    public List<Delivery>  getDeliveriesByStatusForRestaurant(String restaurantId, String orderStatus);
    public Delivery rejectProcessingDelivery(String deliveryId) throws NotFoundException;

    //
    //############## neutral ##############
    //
    //confirm / complete / cancel / reject delivery
    public Delivery setOrderStatusByDelivery(String deliveryId, String orderStatus) throws NotFoundException;
    public Delivery getSingleDelivery(String deliveryId) throws NotFoundException;

}
