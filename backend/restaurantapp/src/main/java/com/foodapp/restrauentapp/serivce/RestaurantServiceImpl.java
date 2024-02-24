package com.foodapp.restrauentapp.serivce;

import com.foodapp.restrauentapp.exceptions.NotFoundException;
import com.foodapp.restrauentapp.model.*;
import com.foodapp.restrauentapp.repository.ItemRepository;
import com.foodapp.restrauentapp.repository.OrderRepository;
import com.foodapp.restrauentapp.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    private RestaurantRepository restaurantRepository;
    private OrderRepository orderRepository;
    private ItemRepository itemRepository;
    private  LoginProxy loginProxy;
    private CustomerProxy customerProxy;


    public RestaurantServiceImpl(RestaurantRepository restaurantRepository, OrderRepository orderRepository, ItemRepository itemRepository, LoginProxy loginProxy, CustomerProxy customerProxy) {
        this.restaurantRepository = restaurantRepository;
        this.orderRepository = orderRepository;
        this.itemRepository = itemRepository;
        this.loginProxy = loginProxy;
        this.customerProxy = customerProxy;
    }

    //############################################################################################################################
    //######################################################## RESTAURANT ########################################################
    //############################################################################################################################
    @Override
    public List<Restaurant> getRestaurantsForUser(String userId) {
        return restaurantRepository.findByUserId(userId);
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @Override
    public Restaurant getRestaurant(String restaurantId) throws NotFoundException {
        Optional<Restaurant> restaurantOptional =  restaurantRepository.findById(restaurantId);

        if(restaurantOptional.isEmpty()){
            throw new NotFoundException("restaurant not found");
        }

        return restaurantOptional.get();
    }
    @Override
    public Restaurant addRestaurant(Restaurant restaurant) {

        return restaurantRepository.save(restaurant);
    }
    @Override
    public boolean removeRestaurant(String restaurantId) throws NotFoundException {
        checkIfRestaurantExists(restaurantId);
        restaurantRepository.deleteById(restaurantId);
        return !restaurantRepository.existsById(restaurantId);
    }
    @Override
    public Restaurant updateRestaurant(Restaurant restaurant) throws NotFoundException {
        checkIfRestaurantExists(restaurant.getId());
        return restaurantRepository.save(restaurant);
    }

    @Override
    public List<Restaurant> getRestaurantsByState(String state) {
        return restaurantRepository.findByAddress_State(state);
    }

    @Override
    public List<Restaurant> getRestaurantsByCity(String city) {
        return restaurantRepository.findByAddress_City(city);
    }

    @Override
    public List<Restaurant> getRestaurantByIds(List<String> Ids) {
        return restaurantRepository.findByIds(Ids);
    }

    //############################################################################################################################
    //######################################################## CART ########################################################
    //############################################################################################################################
    @Override
    public List<Order> getCart(String customerId) {

        return orderRepository.findByCustomerIdAndStatus(customerId,OrderStatus.PENDING);
    }

    @Override
    public Order addToCart(Order order) {
        order.setStatus(OrderStatus.PENDING);
        return orderRepository.save(order);
    }

    @Override
    public boolean removeFromCart(String orderId) throws NotFoundException {

        checkIfOrderExists(orderId);
        orderRepository.deleteById(orderId);
        return !orderRepository.existsById(orderId);
    }

    @Override
    public boolean confirmCartOrder(List<CartItem> cart, String customerId) throws NotFoundException {
        for (CartItem cartItem: cart){
            confirmOrder(cartItem.getOrderId());
        }

        return getCart(customerId).isEmpty();
    }

    //############################################################################################################################
    //######################################################## MENU(ITEM) ########################################################
    //############################################################################################################################

    @Override
    public List<Item> getMenu(String restaurantId) throws NotFoundException {

        checkIfRestaurantExists(restaurantId);
        return itemRepository.findByRestaurantId(restaurantId);
    }
    @Override
    public Item addItem(Item item)  {
        return itemRepository.save(item);
    }
    @Override
    public Item updateItem(Item item) throws NotFoundException {
        checkIfItemExists(item.getId());
        return itemRepository.save(item);
    }

    @Override
    public boolean removeItem(String itemId) {
        itemRepository.deleteById(itemId);
        return itemRepository.existsById(itemId);
    }

    @Override
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @Override
    public List<Item> getItemsByIds(List<String> ids) {
        return itemRepository.findByIds(ids);
    }

    @Override
    public Item getItemById(String itemId) throws NotFoundException {
        Optional<Item> item = itemRepository.findById(itemId);
        if(item.isEmpty()){
            throw new NotFoundException("item not found");
        }
        return  item.get();
    }

    //############################################################################################################################
    //######################################################## ORDER ########################################################
    //############################################################################################################################
    @Override
    public Order addOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrder(Order order) throws NotFoundException {
        checkIfOrderExists(order.getId());
        return orderRepository.save(order);
    }
    @Override
    public boolean confirmOrder(String orderId) throws NotFoundException {
        checkIfOrderExists(orderId);
        orderRepository.updateStatusById(orderId,OrderStatus.CONFIRMED);

        return orderRepository.findById(orderId).get().getStatus().equals(OrderStatus.CONFIRMED);
    }
    @Override
    public boolean cancelOrder(String orderId) throws NotFoundException {

        checkIfOrderExists(orderId);

        orderRepository.deleteById(orderId);
        return !orderRepository.existsById(orderId);
    }
    @Override
    public Order orderCompleted(String orderId) throws NotFoundException {
        checkIfOrderExists(orderId);

        orderRepository.updateStatusById(orderId,OrderStatus.COMPLETED);

        return orderRepository.findById(orderId).get();
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> getAllOrdersByStatus(String status) {
        return orderRepository.findByStatus(status);
    }

    @Override
    public List<Order> getOrdersByStatusForCustomer(String customerId, String orderStatus) {
        return orderRepository.findByCustomerIdAndStatus(customerId,orderStatus);
    }

    @Override
    public List<Order> getOrdersByStatusForRestaurant(String restaurantId, String orderStatus) {
        return orderRepository.findByRestaurantIdAndStatus( restaurantId,orderStatus  );
    }

    @Override
    public List<Order> processListOfOrders(List<String> orders) {
        for(String orderId:orders){
            orderRepository.updateStatusById(orderId , OrderStatus.PROCESSING  );
        }
        return orderRepository.findByStatus(OrderStatus.PROCESSING);
    }

    @Override
    public Order processSingleOrder(String orderId) throws NotFoundException {
        if(!orderRepository.existsById(orderId)){
            throw new NotFoundException("order does not exist");
        }
        orderRepository.updateStatusById(orderId , OrderStatus.PROCESSING  );
        return  orderRepository.findById(orderId).get();
    }

    @Override
    public List<Order> confirmOrders(List<String> orders) {
        return null;
    }

    @Override
    public Order confirmSingleOrder(String orderId) {
        return null;
    }

    @Override
    public List<Order> completeListOfOrders(String orderId) {
        return null;
    }

    @Override
    public Order completeSingleOrders(String orderId) {
        return null;
    }

    //############################################################################################################################
    //######################################################## HISTORY ########################################################
    //############################################################################################################################

    @Override
    public List<Order> getCustomerHistory(String customerId) {
        return orderRepository.findByCustomerIdAndStatus(customerId, OrderStatus.COMPLETED);
    }

    @Override
    public List<Order> getRestaurantHistory(String restaurantId) throws NotFoundException {

        checkIfRestaurantExists(restaurantId);
        return orderRepository.findByRestaurantId(restaurantId);
    }



    //popularity

    @Override
    public Map<String, Integer> getRestaurantPopularity() {

        return null;
    }

    @Override
    public Map<String, Integer> getItemPopularity() {
        return null;
    }

    @Override
    public Map<String, Integer> getPopularCities() {

        List<Restaurant> restaurants = restaurantRepository.findAll();
        ResponseEntity<?> response = customerProxy.getFavorites("RESTAURANT");
        Map<String, Integer> favoriteRestaurants = (Map<String, Integer>) response.getBody();

        final Map<String, Integer> cityPopularity = new HashMap<>();

        restaurants.forEach(restaurant -> {
            final String id = restaurant.getId();
            final String city = restaurant.getAddress().getCity();

            if (favoriteRestaurants.containsKey(id)) {
                cityPopularity.merge(city, favoriteRestaurants.get(id), Integer::sum);
            }
        });

        // Sort the map by values in descending order
        List<Map.Entry<String, Integer>> sortedCities =
                cityPopularity.entrySet().stream()
                        .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                        .collect(Collectors.toList());

        // Take the top 20 entries
        List<Map.Entry<String, Integer>> top20Cities = sortedCities.stream().limit(20).collect(Collectors.toList());

        // Create a new map with the top 20 cities
        Map<String, Integer> top20CityPopularity = new LinkedHashMap<>();
        top20Cities.forEach(entry -> top20CityPopularity.put(entry.getKey(), entry.getValue()));

        return top20CityPopularity;
    }

    //############################################################################################################################
    //######################################################## UTILITY METHODS ########################################################
    //############################################################################################################################
    private void checkIfRestaurantExists(String restaurantId) throws NotFoundException {

        if(!restaurantRepository.existsById(restaurantId)){
            throw new NotFoundException("restaurant not found");
        }

    }

    private void checkIfOrderExists(String orderId) throws NotFoundException {

        if(!orderRepository.existsById(orderId)){
            throw new NotFoundException("order not found");
        }

    }
    private void checkIfItemExists(String itemId) throws NotFoundException {

        if(!itemRepository.existsById(itemId)){
            throw new NotFoundException("item not found");
        }
    }


}
