package com.foodapp.restrauentapp.serivce;


import com.foodapp.restrauentapp.exceptions.NotFoundException;
import com.foodapp.restrauentapp.model.CartItem;
import com.foodapp.restrauentapp.model.Item;
import com.foodapp.restrauentapp.model.Order;
import com.foodapp.restrauentapp.model.Restaurant;

import java.util.List;
import java.util.Map;

public interface RestaurantService {

    //restaurant
    public List<Restaurant> getRestaurantsForUser(String userId);
    public Restaurant getRestaurant(String restaurantId) throws NotFoundException;
    public Restaurant addRestaurant(Restaurant restaurant);
    public boolean removeRestaurant(String restaurantId) throws NotFoundException;
    public Restaurant updateRestaurant(Restaurant restaurant) throws NotFoundException;
    public List<Restaurant> getAllRestaurants();
    public List<Restaurant> getRestaurantsByState(String state);
    public List<Restaurant> getRestaurantsByCity(String city);
    public List<Restaurant> getRestaurantByIds(List<String> Ids);


    //item
    public Item addItem(Item item) ;
    public boolean removeItem(String itemId);
    public Item updateItem(Item item) throws NotFoundException;
    public List<Item> getMenu(String restaurantId) throws NotFoundException;

    public List<Item> getAllItems();
    public List<Item> getItemsByIds(List<String> ids);
    public Item getItemById(String itemId) throws NotFoundException;



    //order
    public Order addOrder(Order order);

    public boolean confirmOrder(String orderId) throws NotFoundException;

    public boolean cancelOrder(String orderId) throws NotFoundException;
    public Order orderCompleted(String orderId) throws NotFoundException;

    public List<Order> getOrdersByStatusForCustomer(String customerId, String orderStatus);
    public List<Order> getOrdersByStatusForRestaurant(String restaurantId, String orderStatus);

    public  List<Order> processListOfOrders(List<String> orders);
    public  Order processSingleOrder(String orderId) throws NotFoundException;
    public  List<Order> confirmOrders(List<String> orders);
    public Order confirmSingleOrder(String orderId);
    public List<Order> completeListOfOrders(String orderId);
    public Order completeSingleOrders(String orderId);




    //cart (customer)
    public List<Order> getCart(String customerId);
    public Order addToCart(Order order);
    public boolean removeFromCart(String orderId) throws NotFoundException;
    public Order updateOrder(Order order) throws NotFoundException;
    public boolean confirmCartOrder(List<CartItem> cart, String customerId) throws NotFoundException;




    //history
    public List<Order> getCustomerHistory(String customerId);
    public List<Order> getRestaurantHistory(String restaurantId) throws NotFoundException;
    public List<Order> getAllOrders();
    public List<Order> getAllOrdersByStatus(String status);


    //popularity

    public Map<String,Integer> getRestaurantPopularity();
    public Map<String,Integer> getItemPopularity();
    public Map<String,Integer> getPopularCities();


}
