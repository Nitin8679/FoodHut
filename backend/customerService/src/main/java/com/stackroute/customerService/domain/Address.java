package com.stackroute.customerService.domain;


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
    private String doorNo;
    private String zipcode;
}
