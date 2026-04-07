package com.faizanperwez.service;

import com.faizanperwez.dto.AttendanceDTO;
import com.faizanperwez.model.Attendance;
import com.faizanperwez.model.Employee;
import com.faizanperwez.repository.AttendanceRepository;
import com.faizanperwez.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AttendanceService {

    @Autowired private AttendanceRepository attendanceRepository;
    @Autowired private EmployeeRepository employeeRepository;

    public List<AttendanceDTO> getMyAttendance(Long userId) {
        Employee emp = employeeRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        return attendanceRepository.findByEmployeeId(emp.getId()).stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public AttendanceDTO checkIn(Long userId) {
        Employee emp = employeeRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        LocalDate today = LocalDate.now();
        Optional<Attendance> existing = attendanceRepository.findByEmployeeIdAndDate(emp.getId(), today);
        if (existing.isPresent()) {
            throw new RuntimeException("Already checked in today");
        }
        Attendance attendance = new Attendance();
        attendance.setDate(today);
        attendance.setCheckIn(LocalTime.now());
        attendance.setEmployee(emp);
        return mapToDTO(attendanceRepository.save(attendance));
    }

    public AttendanceDTO checkOut(Long userId) {
        Employee emp = employeeRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        LocalDate today = LocalDate.now();
        Attendance existing = attendanceRepository.findByEmployeeIdAndDate(emp.getId(), today)
                .orElseThrow(() -> new RuntimeException("No check-in found for today"));
        
        if (existing.getCheckOut() != null) {
            throw new RuntimeException("Already checked out today");
        }
        existing.setCheckOut(LocalTime.now());
        return mapToDTO(attendanceRepository.save(existing));
    }

    private AttendanceDTO mapToDTO(Attendance att) {
        AttendanceDTO dto = new AttendanceDTO();
        dto.setId(att.getId());
        dto.setDate(att.getDate());
        dto.setCheckIn(att.getCheckIn());
        dto.setCheckOut(att.getCheckOut());
        if (att.getEmployee() != null) {
            dto.setEmployeeId(att.getEmployee().getId());
            dto.setEmployeeName(att.getEmployee().getFirstName() + " " + att.getEmployee().getLastName());
        }
        return dto;
    }
}
