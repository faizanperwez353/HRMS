package com.faizanperwez.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class AppraisalDTO {
    private Long id;
    private Long employeeId;
    private String employeeName;
    private Integer rating;
    private String feedback;
    private String reviewedBy;
    private LocalDate reviewDate;
    private String period;
}
