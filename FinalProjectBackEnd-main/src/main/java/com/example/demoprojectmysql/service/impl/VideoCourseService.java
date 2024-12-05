package com.example.demoprojectmysql.service.impl;


import com.example.demoprojectmysql.model.dto.OrderCreateDTO;
import com.example.demoprojectmysql.model.entity.*;
import com.example.demoprojectmysql.repository.AccountRepository;
import com.example.demoprojectmysql.repository.CourseRepository;
import com.example.demoprojectmysql.repository.OrderRepository;
import com.example.demoprojectmysql.repository.VideoCourseRepository;
import com.example.demoprojectmysql.service.IOderService;
import com.example.demoprojectmysql.service.IVideoCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class VideoCourseService implements IVideoCourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private VideoCourseRepository videoCourseRepository;

    @Override
    public List<VideoCourse> getByCourseID(int accountID) {
        return videoCourseRepository.findByCourse_Id(accountID);
    }

//    @Override
//    public List<Order> getAll() {
//        return orderRepository.findAll();
//    }
//
//    @Override
//    public List<Order> findAllByAccount_IdAndOrderStatus(int accountID,OrderStatus status) {
//        return orderRepository.findAllByAccount_IdAndOrderStatus(accountID,status);
//    }

//    @Override
//    public Order create(OrderCreateDTO dto) {
//        Optional<Account> accountOptional = accountRepository.findById(dto.getAccountId());
//        Optional<Course> courseOptional = courseRepository.findById(dto.getCourseId());
//        if (accountOptional.isPresent() && courseOptional.isPresent()) {
//            Account account = accountOptional.get();
//            Course course = courseOptional.get();
//            Order order = new Order();
//            order.setAccount(account);
//            order.setCourse(course);
////            order.setQuantity(dto.getQuantity());
//            order.setOrderStatus(OrderStatus.PENDING);
//            return orderRepository.save(order);
//        }
//
//        return null;
//    }
//
//    @Override
//    public Order buyCourse(int orderId) {
//        Optional<Order> orderOptional = orderRepository.findById(orderId);
//        if (orderOptional.isPresent()) {
//            Order order = orderOptional.get();
//            order.setOrderStatus(OrderStatus.DONE);
//            return orderRepository.save(order);
//        }
//        return null;
//    }
//
//    @Override
//    public Order cancelOrder(int orderId) {
//        Optional<Order> orderOptional = orderRepository.findById(orderId);
//        if (orderOptional.isPresent()) {
//            Order order = orderOptional.get();
//            order.setOrderStatus(OrderStatus.CANCEL);
//            return orderRepository.save(order);
//        }
//        return null;
//    }
//

//
//    @Override
//    public int countByAccount_UsernameAndStatus(String username,OrderStatus status) {
//        return orderRepository.countByAccount_UsernameAndOrderStatus(username,status);
//    }
//
//
}