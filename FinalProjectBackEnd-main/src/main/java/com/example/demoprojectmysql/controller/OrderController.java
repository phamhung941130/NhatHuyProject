package com.example.demoprojectmysql.controller;

import com.example.demoprojectmysql.model.dto.OrderCreateDTO;
import com.example.demoprojectmysql.model.entity.Order;
import com.example.demoprojectmysql.model.entity.OrderStatus;
import com.example.demoprojectmysql.service.impl.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/v1/order")
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private OrderService orderService;


    @GetMapping("/get-all")
    public List<Order> getAll(){
        return orderService.getAll();
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/get-bt-status")
    public List<Order> findByStatus(@RequestParam OrderStatus status){
        return orderService.findByStatus(status);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/create")
    public Order create(@RequestBody OrderCreateDTO dto) {
        return orderService.create(dto);

    }
    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/buy/{id}")
    public Order buy(@PathVariable int id) {
        return orderService.buyCourse(id);
    }
    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/cancel/{id}")
    public Order cancel(@PathVariable int id) {
        return orderService.cancelOrder(id);
    }
}