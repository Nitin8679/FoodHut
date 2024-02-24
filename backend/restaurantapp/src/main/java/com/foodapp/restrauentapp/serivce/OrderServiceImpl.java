package com.foodapp.restrauentapp.serivce;

import com.foodapp.restrauentapp.exceptions.NotFoundException;
import com.foodapp.restrauentapp.model.Delivery;
import com.foodapp.restrauentapp.model.Order;
import com.foodapp.restrauentapp.model.OrderStatus;
import com.foodapp.restrauentapp.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.nio.ByteBuffer;
import java.util.*;

@Service
public class OrderServiceImpl implements  OrderService{

    private OrderRepository orderRepository;
    private final static int DELIVERY_ID_LENGTH =16;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Order addOrderToCustomerCart(Order order) {
        order.setStatus(OrderStatus.PENDING);
        return orderRepository.save(order);
    }

    @Override
    public boolean removeOrderFromCustomerCart(String orderId) throws NotFoundException {
        if(!orderRepository.existsById(orderId)){
            throw new NotFoundException("order no longer exists");
        }
        orderRepository.deleteById(orderId);

        return !orderRepository.existsById(orderId);
    }

    @Override
    public Order updateOrderInCustomerCart(Order order) throws NotFoundException {
        if(!orderRepository.existsById(order.getId())){
            throw new NotFoundException("order no longer exists");

        }
        return orderRepository.save(order);
    }

    @Override
    public Delivery processOrders(List<String> orders) throws NotFoundException {

        String deliveryId = generateCombinedShortId( DELIVERY_ID_LENGTH );
        for (String orderId : orders) {
            try {
                Optional<Order> orderOptional = orderRepository.findById(orderId);
                orderOptional.ifPresent(order -> {
                    // If the order is found, add it to the orderList

                    order.setStatus( OrderStatus.PROCESSING );
                    order.setDeliveryId( deliveryId );

                    orderRepository.save( order );

                });

            } catch (Exception e) {
                // Handle exceptions if needed
                e.printStackTrace();
            }
        }

        List<Order> orderList = orderRepository.findByDeliveryId( deliveryId );

        if(orderList.isEmpty()){
            throw new NotFoundException();
        }

        return new Delivery(orderList);
    }

    @Override
    public Delivery getSingleDelivery(String deliveryId) throws NotFoundException {
        List<Order> orders = orderRepository.findByDeliveryId(deliveryId);
        if(orders.isEmpty()){
            throw new NotFoundException();
        }

        return  new Delivery(orders);
    }

    @Override
    public List<Order> getCartForCustomer(String customerId) {
        return orderRepository.findByCustomerIdAndStatus(customerId,OrderStatus.PENDING);
    }

    @Override
    public List<Delivery> getDeliveriesByStatusForCustomer(String customerId, String orderStatus) {
        List<Order> orders = orderRepository.findByCustomerIdAndStatus(customerId, orderStatus);

        // Group orders by delivery ID
        Map<String, List<Order>> ordersByDeliveryId = new HashMap<>();
        for (Order order : orders) {
            String deliveryId = order.getDeliveryId();
            ordersByDeliveryId.computeIfAbsent(deliveryId, k -> new ArrayList<>()).add(order);
        }

        // Create Delivery objects from the grouped orders
        List<Delivery> deliveries = new ArrayList<>();
        for (Map.Entry<String, List<Order>> entry : ordersByDeliveryId.entrySet()) {
            Delivery delivery = new Delivery();
            delivery.setOrderList(entry.getValue());
            deliveries.add(delivery);
        }

        return deliveries;
    }

    @Override
    public List<Delivery> getDeliveriesByStatusForRestaurant(String restaurantId, String orderStatus) {
        List<Order> orders = orderRepository.findByRestaurantIdAndStatus(restaurantId, orderStatus);
        Map<String, List<Order>> ordersByDeliveryId = new HashMap<>();
        for (Order order : orders) {
            String deliveryId = order.getDeliveryId();
            ordersByDeliveryId.computeIfAbsent(deliveryId, k -> new ArrayList<>()).add(order);
        }

        // Create Delivery objects from the grouped orders
        List<Delivery> deliveries = new ArrayList<>();
        for (Map.Entry<String, List<Order>> entry : ordersByDeliveryId.entrySet()) {
            Delivery delivery = new Delivery();
            delivery.setOrderList(entry.getValue());
            deliveries.add(delivery);
        }

        return deliveries;
    }

    @Override
    public Delivery completeDelivery(String deliveryId) throws NotFoundException {
        List<Order> orders = orderRepository.findByDeliveryId(deliveryId);
        if(orders.isEmpty()){
            throw new NotFoundException();
        }

        orderRepository.updateStatusByDeliveryId( deliveryId, OrderStatus.COMPLETED );

        orders = orderRepository.findByDeliveryId(deliveryId);

        return new Delivery(orders) ;
    }

    @Override
    public Delivery rejectProcessingDelivery(String deliveryId) throws NotFoundException {
        List<Order> orders = orderRepository.findByDeliveryId(deliveryId);
        if(orders.isEmpty()){
            throw new NotFoundException();
        }

        orderRepository.updateStatusByDeliveryId( deliveryId, OrderStatus.REJECTED );

        orders = orderRepository.findByDeliveryId(deliveryId);

        return  new Delivery(orders);
    }

    @Override
    public Delivery setOrderStatusByDelivery(String deliveryId, String orderStatus) throws NotFoundException {
        List<Order> orders = orderRepository.findByDeliveryId(deliveryId);
        if(orders.isEmpty()){
            throw new NotFoundException();
        }

        orderRepository.updateStatusByDeliveryId(deliveryId , orderStatus);
        orders = orderRepository.findByDeliveryId(deliveryId);

        return  new Delivery(orders);
    }


    @Override
    public List<Order> setMultipleOrderStatus(String orderStatus, List<String> orderIds) {
        orderRepository.updateStatusForMultipleOrders( orderIds , orderStatus );
//        ResponseEntity<String> resp=razorPayProxy.sendOrder()
        return orderRepository.findByOrderIds(orderIds);
    }

    @Override
    public List<Order> getOrdersByStatusForCustomer(String customerId, String orderStatus) {
        return orderRepository.findByCustomerIdAndStatus(customerId, orderStatus);
    }

    @Override
    public Order setOrderStatusForSingleOrder(String orderId, String status) throws NotFoundException {
        if(orderRepository.findById(orderId).isEmpty()){
            throw new NotFoundException("order not found");
        }
        orderRepository.updateStatusById(orderId, status);
        return orderRepository.findById(orderId).get();
    }



    @Override
    public List<Order> getOrdersByStatusForRestaurant(String restaurantId, String orderStatus) {
        return orderRepository.findByRestaurantIdAndStatus(restaurantId, orderStatus);
    }

    @Override
    public boolean deleteOrder(String orderId) throws NotFoundException {
        if(!orderRepository.existsById(orderId)){
            throw new NotFoundException();
        }
        orderRepository.deleteById(orderId);

        return !orderRepository.existsById(orderId);
    }

    //utility
    public static String generateCombinedShortId(int length) {
        ByteBuffer bb = ByteBuffer.wrap(new byte[16]);
        UUID uuid = UUID.randomUUID();
        bb.putLong(uuid.getMostSignificantBits());
        bb.putLong(uuid.getLeastSignificantBits());

        byte[] uuidBytes = bb.array();
        String base64Encoded = Base64.getEncoder().encodeToString(uuidBytes);

        // Trim the string to the desired length
        return base64Encoded.substring(0, Math.min(length, base64Encoded.length()));
    }
}
