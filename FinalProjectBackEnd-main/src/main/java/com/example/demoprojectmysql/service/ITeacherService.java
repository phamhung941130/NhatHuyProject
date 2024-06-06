package com.example.demoprojectmysql.service;

import com.example.demoprojectmysql.model.dto.TeacherCreateDTO;
import com.example.demoprojectmysql.model.dto.CompanyUpdateDTO;
import com.example.demoprojectmysql.model.entity.Teacher;

import java.util.List;

public interface ITeacherService {
    List<Teacher> getAll();
    Teacher getById(int id);
    Teacher create(TeacherCreateDTO dto); // thêm mới
    Teacher update(CompanyUpdateDTO dto);
    Teacher delete(int id);

}
