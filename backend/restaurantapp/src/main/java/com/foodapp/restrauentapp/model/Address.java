package com.foodapp.restrauentapp.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class Address {
    private String state;
    private String city;
    private String street;
    private String area;
    private String doorNo;
    private String zipcode;
}
