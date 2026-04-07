package com.faizanperwez.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AttendanceDTO {
    private Long id;
    private LocalDate date;
    private LocalTime checkIn;
    private LocalTime checkOut;
    private Long employeeId;
    private String employeeName;
}
