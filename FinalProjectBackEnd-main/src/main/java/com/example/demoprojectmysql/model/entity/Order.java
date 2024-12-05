package com.example.demoprojectmysql.model.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "`ORDER`")
@Data
public class Order extends Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "ORDER_STATUS")
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "COURSE_ID")
    private Course course;
}
