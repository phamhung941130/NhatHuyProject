package com.example.demoprojectmysql.controller;

import com.example.demoprojectmysql.model.dto.OrderCreateDTO;
import com.example.demoprojectmysql.model.entity.Order;
import com.example.demoprojectmysql.model.entity.OrderStatus;
import com.example.demoprojectmysql.model.entity.VideoCourse;
import com.example.demoprojectmysql.service.impl.OrderService;
import com.example.demoprojectmysql.service.impl.VideoCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/v1/video")
@CrossOrigin("*")
public class VideoCourseController {
    @Autowired
    private VideoCourseService videoCourseService;


//    @GetMapping("/get-all")
//    public List<VideoCourse> getAll(){
//        return videoCourseService.getAll();
//    }

    @GetMapping("/get-by-courseID")
    public List<VideoCourse> getByCourseID(@RequestParam int courseID){

        return videoCourseService.getByCourseID(courseID);
    }

//    @PreAuthorize("hasAuthority('USER')")
//    @GetMapping("/get-by-status")
//    public List<Order> findByStatus(@RequestParam int accountID, OrderStatus status){
//        return orderService.findAllByAccount_IdAndOrderStatus(accountID,status);
//    }
//
//    @PreAuthorize("hasAuthority('USER')")
//    @PostMapping("/create")
//    public Order create(@RequestBody OrderCreateDTO dto) {
//        return orderService.create(dto);
//
//    }
//    @PreAuthorize("hasAuthority('USER')")
//    @PostMapping("/buy/{id}")
//    public Order buy(@PathVariable int id) {
//        return orderService.buyCourse(id);
//    }
//    @PreAuthorize("hasAuthority('USER')")
//    @PostMapping("/cancel/{id}")
//    public Order cancel(@PathVariable int id) {
//        return orderService.cancelOrder(id);
//    }
}