package com.example.demoprojectmysql.service.impl;



import com.example.demoprojectmysql.model.dto.TeacherCreateDTO;
import com.example.demoprojectmysql.model.dto.CompanyUpdateDTO;

import com.example.demoprojectmysql.model.entity.Teacher;
import com.example.demoprojectmysql.repository.TeacherRepository;
import com.example.demoprojectmysql.service.ITeacherService;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor

public class TeacherService implements ITeacherService {
    @Autowired
    private TeacherRepository teacherrepository;
    @Override
    public List<Teacher> getAll() {
        return teacherrepository.findAll();
    }

    @Override
    public Teacher getById(int id) {
        Optional<Teacher> optionalTeacher = teacherrepository.findById(id);
        if (optionalTeacher.isPresent()){
            return optionalTeacher.get();
        }
        return null;
    }
    @Override
    public Teacher create(TeacherCreateDTO dto) {
        Teacher teacher = new Teacher();
        BeanUtils.copyProperties(dto, teacher);
        return teacherrepository.save(teacher);
    }
    @Override
    public Teacher update(CompanyUpdateDTO dto) {
        Optional<Teacher> optionalCompany = teacherrepository.findById(dto.getId());
        if (optionalCompany.isPresent()) {
            Teacher teacher = optionalCompany.get();
            BeanUtils.copyProperties(dto, teacher);
            return teacherrepository.save(teacher);
        }
        return null;
    }

    @Override
    public Teacher delete(int id) {
        teacherrepository.deleteById(id);
        return null;

    }
}
