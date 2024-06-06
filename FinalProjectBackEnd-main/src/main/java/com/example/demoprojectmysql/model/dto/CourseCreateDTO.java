package com.example.demoprojectmysql.model.dto;

import com.example.demoprojectmysql.model.entity.CourseStatus;
import com.example.demoprojectmysql.model.entity.CourseType;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class CourseCreateDTO {
    @NotBlank(message = "Tên khóa học không được để trống")
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
