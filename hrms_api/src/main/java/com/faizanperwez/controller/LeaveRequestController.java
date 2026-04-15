package com.faizanperwez.controller;

import com.faizanperwez.dto.LeaveRequestDTO;
import com.faizanperwez.security.UserDetailsImpl;
import com.faizanperwez.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/leaves")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('HR') or hasRole('MANAGER')")
    public ResponseEntity<List<LeaveRequestDTO>> getAllLeaves() {
        return ResponseEntity.ok(leaveService.getAllLeaves());
    }

    @GetMapping("/my")
    // @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    @PreAuthorize("permitAll()")
    public ResponseEntity<List<LeaveRequestDTO>> getMyLeaves(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(leaveService.getMyLeaves(userDetails.getId()));
    }

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<LeaveRequestDTO> applyLeave(@RequestBody LeaveRequestDTO dto,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(leaveService.applyLeave(dto, userDetails.getId()));
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<LeaveRequestDTO> approveLeave(@PathVariable Long id) {
        return ResponseEntity.ok(leaveService.updateStatus(id, "APPROVED"));
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<LeaveRequestDTO> rejectLeave(@PathVariable Long id) {
        return ResponseEntity.ok(leaveService.updateStatus(id, "REJECTED"));
    }
}
