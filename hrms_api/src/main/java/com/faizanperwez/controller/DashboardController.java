package com.faizanperwez.controller;

import com.faizanperwez.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired EmployeeRepository employeeRepository;
    @Autowired DepartmentRepository departmentRepository;
    @Autowired ProjectRepository projectRepository;
    @Autowired SalaryRepository salaryRepository;
    @Autowired AppraisalRepository appraisalRepository;

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalEmployees", employeeRepository.count());
        stats.put("totalDepartments", departmentRepository.count());
        stats.put("totalProjects", projectRepository.count());
        stats.put("totalSalaryRecords", salaryRepository.count());
        stats.put("totalAppraisals", appraisalRepository.count());

        long activeEmployees = employeeRepository.findAll().stream()
                .filter(e -> "ACTIVE".equals(e.getStatus()))
                .count();
        stats.put("activeEmployees", activeEmployees);

        return ResponseEntity.ok(stats);
    }
}
