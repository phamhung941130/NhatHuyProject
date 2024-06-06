package com.example.demoprojectmysql.controller;

import com.example.demoprojectmysql.model.dto.TeacherCreateDTO;
import com.example.demoprojectmysql.model.dto.CompanyUpdateDTO;
import com.example.demoprojectmysql.model.entity.Teacher;
import com.example.demoprojectmysql.service.impl.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/company")
public class CompanyController {
    @Autowired
    private TeacherService companyService;

    @GetMapping("/get-all")
    public List<Teacher> getAll() {
        return companyService.getAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("{id}")
    public Teacher getById(@PathVariable int id) {
        return companyService.getById(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/create")
    public Teacher create(@RequestBody TeacherCreateDTO dto) {
        return companyService.create(dto);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/update")
    public Teacher update(@RequestBody CompanyUpdateDTO dto) {
        return companyService.update(dto);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        companyService.delete(id);
    }

}