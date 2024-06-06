package com.example.demoprojectmysql.model.dto;

import com.example.demoprojectmysql.model.entity.Role;
import lombok.Data;

@Data
public class AccountLoginResponse {
    private int id;
    private String username;
    private String fullName;
    private String avatar;
    private String address;
    private Role role;
    private String token;
    private int quantity_Order;

}
