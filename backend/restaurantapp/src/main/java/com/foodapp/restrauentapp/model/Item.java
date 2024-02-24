package com.foodapp.restrauentapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Document
public class Item {

    @Id
    private String id;

    private String restaurantId;

    private String name;
    private double price;
    private String category;
    private String description;
    private double rating;

}
