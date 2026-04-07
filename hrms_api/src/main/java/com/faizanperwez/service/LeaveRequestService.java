package com.faizanperwez.service;

import com.faizanperwez.dto.LeaveRequestDTO;
import com.faizanperwez.model.Employee;
import com.faizanperwez.model.LeaveRequest;
import com.faizanperwez.repository.EmployeeRepository;
import com.faizanperwez.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeaveRequestService {

    @Autowired private LeaveRequestRepository leaveRepository;
    @Autowired private EmployeeRepository employeeRepository;

    public List<LeaveRequestDTO> getAllLeaves() {
        return leaveRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public List<LeaveRequestDTO> getMyLeaves(Long userId) {
        Employee emp = employeeRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Employee not found for user: " + userId));
        return leaveRepository.findByEmployeeId(emp.getId()).stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public LeaveRequestDTO applyLeave(LeaveRequestDTO dto, Long userId) {
        Employee emp = employeeRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Employee not found for user"));
        LeaveRequest leave = new LeaveRequest();
        leave.setLeaveType(dto.getLeaveType());
        leave.setStartDate(dto.getStartDate());
        leave.setEndDate(dto.getEndDate());
        leave.setReason(dto.getReason());
        leave.setStatus("PENDING");
        leave.setEmployee(emp);
        LeaveRequest saved = leaveRepository.save(leave);
        return mapToDTO(saved);
    }

    public LeaveRequestDTO updateStatus(Long id, String status) {
        LeaveRequest leave = leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave Request not found"));
        leave.setStatus(status);
        LeaveRequest saved = leaveRepository.save(leave);
        return mapToDTO(saved);
    }

    private LeaveRequestDTO mapToDTO(LeaveRequest leave) {
        LeaveRequestDTO dto = new LeaveRequestDTO();
        dto.setId(leave.getId());
        dto.setLeaveType(leave.getLeaveType());
        dto.setStartDate(leave.getStartDate());
        dto.setEndDate(leave.getEndDate());
        dto.setReason(leave.getReason());
        dto.setStatus(leave.getStatus());
        if (leave.getEmployee() != null) {
            dto.setEmployeeId(leave.getEmployee().getId());
            dto.setEmployeeName(leave.getEmployee().getFirstName() + " " + leave.getEmployee().getLastName());
        }
        return dto;
    }
}
