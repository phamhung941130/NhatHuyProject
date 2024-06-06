package com.example.demoprojectmysql.service.impl;

import com.example.demoprojectmysql.config.exception.CustomException;
import com.example.demoprojectmysql.config.exception.ErrorResponseEnum;
import com.example.demoprojectmysql.model.dto.CourseCreateDTO;
import com.example.demoprojectmysql.model.dto.CourseUpdateDTO;
import com.example.demoprojectmysql.model.dto.SearchCourseRequest;
import com.example.demoprojectmysql.model.entity.Course;
import com.example.demoprojectmysql.model.entity.CourseStatus;
import com.example.demoprojectmysql.model.entity.CourseType;
import com.example.demoprojectmysql.model.entity.Teacher;
import com.example.demoprojectmysql.repository.CourseRepository;
import com.example.demoprojectmysql.repository.TeacherRepository;
import com.example.demoprojectmysql.repository.specification.CourseSpecification;
import com.example.demoprojectmysql.service.ICourseService;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor

public class CourseService implements ICourseService {
    @Autowired
    private CourseRepository courserepository;
    @Autowired
    private TeacherRepository teacherRepository;
    @Override
    public List<Course> getAll() {
        return courserepository.findAll();
    }

    @Override
    public Page<Course> search(SearchCourseRequest request) {
        PageRequest pageRequest = null;
        if ("DESC".equals(request.getSortType())){
            // giá trị page mà thư viện mong muốn để vào trang đầu tiên : 0
            // giá trị page mình muốn để lấy trang đầu tiên : 1-1
            pageRequest = PageRequest.of(request.getPage()-1, request.getSize(), Sort.by(request.getSortField()).descending());
        } else {
            pageRequest = PageRequest.of(request.getPage()-1, request.getSize(), Sort.by(request.getSortField()).ascending());
        }

        Specification<Course> condition = CourseSpecification.buildCondition(request);

        return courserepository.findAll(condition,pageRequest);
    }

    @Override
    public Course getById(int id) {
        Optional<Course> optionalCourse = courserepository.findById(id);
        if (optionalCourse.isPresent()){
            return optionalCourse.get();
        }
        return null;
    }
    @Override
    public Course create(CourseCreateDTO dto) {
        boolean checkCourseName = courserepository.existsByCourseName(dto.getCourseName());
        if(checkCourseName){
            throw new CustomException(ErrorResponseEnum.COURSE_NAME_EXISTED);
        }
       CourseType courseType = CourseType.valueOf(dto.getCourseType());
        CourseStatus courseStatus = CourseStatus.valueOf(dto.getStatus());
        Optional<Teacher> optionalTeacher = teacherRepository.findById(dto.getTeacherId());
        Course course = new Course();
        BeanUtils.copyProperties(dto, course);
        course.setCourseType(courseType);
        course.setTeacher(optionalTeacher.get());
        course.setStatus(courseStatus);
        return courserepository.save(course);
    }
    @Override
    public Course update(CourseUpdateDTO dto) {
        Optional<Course> optionalCourse = courserepository.findById(dto.getId());
        if (optionalCourse.isPresent()) {
            CourseType courseType = CourseType.valueOf(dto.getCourseType());
            CourseStatus courseStatus = CourseStatus.valueOf(dto.getStatus());
            Optional<Teacher> optionalTeacher = teacherRepository.findById(dto.getTeacherId());
            Course course = new Course();
            BeanUtils.copyProperties(dto, course);
            course.setCourseType(courseType);
            course.setTeacher(optionalTeacher.get());
            course.setStatus(courseStatus);

            return courserepository.save(course);
        }
        return null;
    }

    @Override
    public Course delete(int id) {
        courserepository.deleteById(id);
        return null;

    }
}
