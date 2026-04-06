package com.faizanperwez.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class EmployeeDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private LocalDate dateOfBirth;
    private LocalDate joiningDate;
    private String designation;
    private String employmentType;
    private String status;
    private Long departmentId;
    private String departmentName;
    private Long userId;
    private String username;
    private List<Long> projectIds;
    private List<Long> skillIds;
}
