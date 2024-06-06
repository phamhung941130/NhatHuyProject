package com.example.demoprojectmysql.model.dto;

import com.example.demoprojectmysql.model.entity.CourseStatus;
import com.example.demoprojectmysql.model.entity.CourseType;
import com.example.demoprojectmysql.model.entity.Teacher;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data

public class CourseDTO {
    private int id;
    private String courseName;
    private String image;
    private int price;
    private int lessionNumber;
    private int studentNumber;
    private String status;
    private String courseType;
    private String teacherName;
    private String courseDescription;
}
