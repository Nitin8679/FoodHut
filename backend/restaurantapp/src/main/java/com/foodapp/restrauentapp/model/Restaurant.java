package com.foodapp.restrauentapp.model;

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
public class Restaurant {

    @Id
    private String id;
    private String name;
    private String contact;
    private String userId;
    private String cuisineType;
    private String description;
    private double rating;
    private Owner owner;
    private Address address;


}
