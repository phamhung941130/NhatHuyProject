package com.example.demoprojectmysql.repository;


import com.example.demoprojectmysql.model.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Integer> { //<Đối tượng làm việc,kiểu dữ liệu Id>

}
