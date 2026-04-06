package com.faizanperwez.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 500)
    private String description;

    private LocalDate startDate;
    private LocalDate endDate;

    @Column(length = 50)
    private String status; // ACTIVE, COMPLETED, ON_HOLD

    @ManyToMany(mappedBy = "projects")
    private List<Employee> employees;
}
