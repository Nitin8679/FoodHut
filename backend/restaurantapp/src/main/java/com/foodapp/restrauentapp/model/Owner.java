package com.foodapp.restrauentapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class Owner {

    private String email;
    private String contact;
    private String fullName;
}
