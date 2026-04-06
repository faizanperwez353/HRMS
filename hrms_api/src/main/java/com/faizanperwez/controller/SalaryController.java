package com.faizanperwez.controller;

import com.faizanperwez.dto.SalaryDTO;
import com.faizanperwez.security.UserDetailsImpl;
import com.faizanperwez.service.EmployeeService;
import com.faizanperwez.service.SalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/salaries")
public class SalaryController {

    @Autowired SalaryService salaryService;
    @Autowired EmployeeService employeeService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SalaryDTO>> getAllSalaries() {
        return ResponseEntity.ok(salaryService.getAllSalaries());
    }

    @GetMapping("/employee/{employeeId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SalaryDTO>> getSalariesByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(salaryService.getSalariesByEmployee(employeeId));
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<List<SalaryDTO>> getMySalaries(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long employeeId = employeeService.getEmployeeByUserId(userDetails.getId()).getId();
        return ResponseEntity.ok(salaryService.getSalariesByEmployee(employeeId));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SalaryDTO> getSalaryById(@PathVariable Long id) {
        return ResponseEntity.ok(salaryService.getSalaryById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SalaryDTO> createSalary(@RequestBody SalaryDTO dto) {
        return ResponseEntity.ok(salaryService.createSalary(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SalaryDTO> updateSalary(@PathVariable Long id, @RequestBody SalaryDTO dto) {
        return ResponseEntity.ok(salaryService.updateSalary(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteSalary(@PathVariable Long id) {
        salaryService.deleteSalary(id);
        return ResponseEntity.noContent().build();
    }
}
