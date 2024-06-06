package com.example.demoprojectmysql.service;

import com.example.demoprojectmysql.model.dto.OrderCreateDTO;
import com.example.demoprojectmysql.model.entity.Order;
import com.example.demoprojectmysql.model.entity.OrderStatus;

import java.util.List;

public interface IOderService {
    List<Order> getAll();
    List<Order> findAllByAccount_IdAndOrderStatus(int accountID,OrderStatus status);
    Order create(OrderCreateDTO dto);
    Order buyCourse (int orderId);
    Order cancelOrder (int orderId);
    List<Order> getByAccountID(int accountID);
    int countByAccount_Username(String username);

}
