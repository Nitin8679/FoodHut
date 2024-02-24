package com.stackroute.customerService.service;


import com.stackroute.customerService.domain.AuthRequest;
import com.stackroute.customerService.domain.Customer;
import com.stackroute.customerService.exception.AlreadyExistsException;
import com.stackroute.customerService.exception.NotFoundException;
import com.stackroute.customerService.exception.ServiceSynchronizationException;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface CustomerService {

    public Customer registerCustomer(Customer customer) throws AlreadyExistsException, ServiceSynchronizationException;
    public ResponseEntity<?> login(AuthRequest authRequest) throws NotFoundException, ServiceSynchronizationException;
    public Customer editAccount(Customer customer) throws NotFoundException;
    public Customer getCustomerDetails(String id) throws NotFoundException;
    public List<Customer> getAllCustomersByAccountStatus(String accountStatus);
    public List<Customer> getAllCustomersByARole(String role);

    public boolean resetPasswordStart(String id, String password);
    public boolean resetPasswordEnd(String id, String code);
    public  boolean changeRole(String id, String password, String role);
    //status
    public boolean activateAccount(String id) throws NotFoundException;
    public  boolean deactivateAccount(String id) throws NotFoundException;
    public  boolean removeAccount(String id) throws NotFoundException;
    public  boolean suspendAccount(String id) throws NotFoundException;


    //favorites
    public List<String> addFavoriteRestaurant(String restaurantId,String customerId) throws NotFoundException;
    public List<String> removeFavoriteRestaurant(String restaurantId,String customerId) throws NotFoundException;
    public List<String> addFavoriteItem(String itemId,String customerId) throws NotFoundException;
    public List<String> removeFavoriteItem(String itemId,String customerId) throws NotFoundException;

    public Map<String,Integer> getPopularity(String type);
    public Map<String,Integer> getPopularItemsForRestaurant(String restaurantId);





}
