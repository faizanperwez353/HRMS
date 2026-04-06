package com.faizanperwez.controller;

import com.faizanperwez.dto.AppraisalDTO;
import com.faizanperwez.security.UserDetailsImpl;
import com.faizanperwez.service.AppraisalService;
import com.faizanperwez.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/appraisals")
public class AppraisalController {

    @Autowired AppraisalService appraisalService;
    @Autowired EmployeeService employeeService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AppraisalDTO>> getAllAppraisals() {
        return ResponseEntity.ok(appraisalService.getAllAppraisals());
    }

    @GetMapping("/employee/{employeeId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AppraisalDTO>> getAppraisalsByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(appraisalService.getAppraisalsByEmployee(employeeId));
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<List<AppraisalDTO>> getMyAppraisals(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long employeeId = employeeService.getEmployeeByUserId(userDetails.getId()).getId();
        return ResponseEntity.ok(appraisalService.getAppraisalsByEmployee(employeeId));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AppraisalDTO> getAppraisalById(@PathVariable Long id) {
        return ResponseEntity.ok(appraisalService.getAppraisalById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AppraisalDTO> createAppraisal(@RequestBody AppraisalDTO dto) {
        return ResponseEntity.ok(appraisalService.createAppraisal(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AppraisalDTO> updateAppraisal(@PathVariable Long id, @RequestBody AppraisalDTO dto) {
        return ResponseEntity.ok(appraisalService.updateAppraisal(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteAppraisal(@PathVariable Long id) {
        appraisalService.deleteAppraisal(id);
        return ResponseEntity.noContent().build();
    }
}
