package com.example.demoprojectmysql.repository;

import com.example.demoprojectmysql.model.entity.Order;
import com.example.demoprojectmysql.model.entity.OrderStatus;
import com.example.demoprojectmysql.model.entity.VideoCourse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoCourseRepository extends JpaRepository<VideoCourse, Integer> {
//    List<Order> findAllByAccount_IdAndOrderStatus(int accountID,OrderStatus orderStatus);
//    int countByAccount_UsernameAndOrderStatus(String username,OrderStatus orderStatus);
    List<VideoCourse> findByCourse_Id(int courseID);

}
