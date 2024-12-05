package com.example.demoprojectmysql.service;

import com.example.demoprojectmysql.model.dto.OrderCreateDTO;
import com.example.demoprojectmysql.model.entity.Order;
import com.example.demoprojectmysql.model.entity.OrderStatus;
import com.example.demoprojectmysql.model.entity.VideoCourse;

import java.util.List;

public interface IVideoCourseService {
    public List<VideoCourse> getByCourseID(int accountID);

}
