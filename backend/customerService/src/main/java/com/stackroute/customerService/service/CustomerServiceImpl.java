package com.stackroute.customerService.service;

import com.stackroute.customerService.domain.*;
import com.stackroute.customerService.exception.AlreadyExistsException;
import com.stackroute.customerService.exception.NotFoundException;
import com.stackroute.customerService.exception.ServiceSynchronizationException;
import com.stackroute.customerService.repository.CustomerRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    private CustomerRepository customerRepository;
    private AuthProxy authProxy;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository, AuthProxy authProxy) {
        this.customerRepository = customerRepository;
        this.authProxy = authProxy;
    }

    @Override
    public Customer registerCustomer( Customer customer) throws AlreadyExistsException, ServiceSynchronizationException {
        if(customerRepository.existsById(customer.getId())){
            throw new AlreadyExistsException("Customer already exists");
        }
        ResponseEntity<?> response = authProxy.register(new AuthRequest( customer.getId(), customer.getPassword() ));

        if(!response.getStatusCode().equals(HttpStatus.CREATED) ){
            throw new ServiceSynchronizationException("could not register in auth");
        }
        customer.setStatus(AccountStatus.ACTIVE);
        return customerRepository.save(customer);
    }

    @Override
    public ResponseEntity<?>  login(AuthRequest authRequest) throws NotFoundException, ServiceSynchronizationException {
        System.out.println("login for customer service");
        System.out.println(authRequest);
        if(!customerRepository.existsById(authRequest.getEmail())){
            throw new NotFoundException("account does not exist");
        }

        ResponseEntity<?> response = authProxy.login(authRequest);

        if(!response.getStatusCode().equals(HttpStatus.OK)){
            throw new ServiceSynchronizationException("login failed");
        }

        return response;

    }

    @Override
    public Customer editAccount(Customer customer) throws NotFoundException {
        Optional<Customer> customerOptional = customerRepository.findById( customer.getId() );
        if(customerOptional.isEmpty()){
            throw new NotFoundException("account does not exist");
        }
        return customerRepository.save(customer);
    }

    @Override
    public boolean changeRole(String id, String password, String role) {
        return false;
    }

    @Override
    public Customer getCustomerDetails(String id) throws NotFoundException {
        Optional<Customer> customerOptional = customerRepository.findById(id);
        if(customerOptional.isEmpty()){
            throw new NotFoundException("account does not exist");
        }
        return customerOptional.get();
    }

    @Override
    public List<Customer> getAllCustomersByAccountStatus(String accountStatus) {
        return null;
    }

    @Override
    public List<Customer> getAllCustomersByARole(String role) {
        return null;
    }

    //password reset
    @Override
    public boolean resetPasswordStart(String id, String password) {
        return false;
    }

    @Override
    public boolean resetPasswordEnd(String id, String password) {
        return false;
    }


    @Override
    public boolean activateAccount(String id) throws NotFoundException {
        return changeAccountStatus(id,AccountStatus.ACTIVE);
    }

    @Override
    public boolean deactivateAccount(String id) throws NotFoundException {

        return changeAccountStatus(id,AccountStatus.INACTIVE);
    }

    @Override
    public boolean removeAccount(String id) throws NotFoundException {
        return changeAccountStatus(id,AccountStatus.TERMINATED);
    }

    @Override
    public boolean suspendAccount(String id) throws NotFoundException {
        return changeAccountStatus(id,AccountStatus.SUSPENDED);
    }

    public boolean changeAccountStatus(String id, String status) throws NotFoundException {
        if(!customerRepository.existsById(id)){
            throw new NotFoundException("customer does not exist");
        }
        customerRepository.updateStatusById(id,status);

        return customerRepository.findById(id).get().getStatus().equals(status);
    }


    //favorite


    @Override
    public List<String> addFavoriteRestaurant(String restaurantId, String customerId) throws NotFoundException {
        if(!customerRepository.existsById(customerId)){
            throw new NotFoundException("customer does not exist");
        }
        customerRepository.addFavoriteRestaurant(customerId,restaurantId);

        return customerRepository.findById(customerId).get().getFavoriteRestaurants();
    }

    @Override
    public List<String> removeFavoriteRestaurant(String restaurantId, String customerId) throws NotFoundException {
        if(!customerRepository.existsById(customerId)){
            throw new NotFoundException("customer does not exist");
        }
        customerRepository.removeFavoriteRestaurant(customerId,restaurantId);

        return customerRepository.findById(customerId).get().getFavoriteRestaurants();
    }

    @Override
    public List<String> addFavoriteItem(String itemId, String customerId) throws NotFoundException {
        if(!customerRepository.existsById(customerId)){
            throw new NotFoundException("customer does not exist");
        }
        customerRepository.addFavoriteItem(customerId,itemId);

        return customerRepository.findById(customerId).get().getFavoriteRestaurants();
    }

    @Override
    public List<String> removeFavoriteItem(String itemId, String customerId) throws NotFoundException {
        if(!customerRepository.existsById(customerId)){
            throw new NotFoundException("customer does not exist");
        }
        customerRepository.removeFavoriteItem(customerId,itemId);

        return customerRepository.findById(customerId).get().getFavoriteRestaurants();
    }

    @Override
    public Map<String, Integer> getPopularity(String type) {

        List<Customer> customers = customerRepository.findAll();

        Map<String,Integer> popularity = new HashMap<>();

        if(type.equalsIgnoreCase("RESTAURANT")){

            customers.forEach(customer -> {
                 final List<String> favoriteRestaurants = customer.getFavoriteRestaurants();

                 if(favoriteRestaurants !=null){
                     favoriteRestaurants.forEach( restaurantId ->{
                         if( popularity.containsKey(restaurantId) ){
                             popularity.put( restaurantId , popularity.get(restaurantId) + 1 );
                         }else{
                             popularity.put( restaurantId , 1 );
                         }
                     } );
                 }

             });


        } else if ( type.equalsIgnoreCase("ITEM")  ) {

            customers.forEach(customer -> {
                final List<String> favoriteItems = customer.getFavoriteItems();

                if(!favoriteItems.isEmpty()){
                    favoriteItems.forEach( itemId ->{
                        if( popularity.containsKey(itemId) ){
                            popularity.put( itemId , popularity.get(itemId) + 1 );
                        }else{
                            popularity.put( itemId , 1 );
                        }
                    } );
                }

            });

        }

        return popularity;
    }

    @Override
    public Map<String, Integer> getPopularItemsForRestaurant(String restaurantId) {
        return null;
    }
}
