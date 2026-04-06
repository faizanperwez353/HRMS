package com.faizanperwez.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class SalaryDTO {
    private Long id;
    private Long employeeId;
    private String employeeName;
    private BigDecimal basicSalary;
    private BigDecimal bonus;
    private BigDecimal deductions;
    private LocalDate paymentDate;
    private String paymentMonth;
    private String status;
}
