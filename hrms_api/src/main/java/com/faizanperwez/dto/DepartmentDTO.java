package com.faizanperwez.dto;

import lombok.Data;

@Data
public class DepartmentDTO {
    private Long id;
    private String name;
    private String description;
    private int employeeCount;
}
