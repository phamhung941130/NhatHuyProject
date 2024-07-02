package com.example.demoprojectmysql.model.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "`VIDEOCOURSE`")
@Data
public class VideoCourse extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;


//    @Column(name = "`QUANTITY`")
//    private int quantity;

    @Column(name = "TITLE", length = 200, unique = true, nullable = false)
    private String title;

    @Column(name = "PATHVIDEO", length = 500, unique = true, nullable = false)
    private String pathVideo;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "COURSE_ID")
    private Course course;
}
