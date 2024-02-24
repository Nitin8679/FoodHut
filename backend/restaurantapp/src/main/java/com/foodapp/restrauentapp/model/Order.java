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
public class Order {
    @Id
    private String id;

    private String customerId;
    private String restaurantId;
    private String itemId;
    private String deliveryId;

    private int amount;
    private String status;
}
