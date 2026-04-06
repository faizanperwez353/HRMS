package com.faizanperwez.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name = "salaries")
public class Salary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal basicSalary;

    @Column(precision = 10, scale = 2)
    private BigDecimal bonus;

    @Column(precision = 10, scale = 2)
    private BigDecimal deductions;

    @Column(nullable = false)
    private LocalDate paymentDate;

    @Column(length = 50)
    private String paymentMonth; // e.g. "March 2026"

    @Column(length = 20)
    private String status; // PAID, PENDING
}
