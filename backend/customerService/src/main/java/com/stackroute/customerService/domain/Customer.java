package com.stackroute.customerService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data


@Document
public class Customer {
    @Id
    private String id;
    private String name;
    private String password;
    private String contact;
    private String status;

    private List<String> favoriteItems;
    private List<String> favoriteRestaurants;

    private Address address;


}

