package com.example.demoprojectmysql.model.dto;

import com.example.demoprojectmysql.model.entity.CourseStatus;
import lombok.Data;

@Data
public class CourseUpdateDTO {
    private int id;
    private String courseName;
    private String image;
    private int price;
    private int lessionNumber;
    private String courseType;
    private String status;
    private int studentNumber;
    private int teacherId;
    private String courseDescription;
}
