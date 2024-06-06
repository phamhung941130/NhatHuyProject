package com.example.demoprojectmysql.repository;

import com.example.demoprojectmysql.model.entity.Order;
import com.example.demoprojectmysql.model.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findAllByAccount_IdAndOrderStatus(int accountID,OrderStatus orderStatus);
    int countByAccount_Username(String username);
    List<Order> findByAccount_Id(int accountID);
}
