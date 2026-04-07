package com.faizanperwez.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class LeaveRequestDTO {
    private Long id;
    private String leaveType;
    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;
    private String status;
    private Long employeeId;
    private String employeeName;
}
