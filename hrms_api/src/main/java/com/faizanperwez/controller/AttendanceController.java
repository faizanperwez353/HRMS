package com.faizanperwez.controller;

import com.faizanperwez.dto.AttendanceDTO;
import com.faizanperwez.security.UserDetailsImpl;
import com.faizanperwez.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired private AttendanceService attendanceService;

    @GetMapping("/my")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<List<AttendanceDTO>> getMyAttendance(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(attendanceService.getMyAttendance(userDetails.getId()));
    }

    @PostMapping("/check-in")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<AttendanceDTO> checkIn(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(attendanceService.checkIn(userDetails.getId()));
    }

    @PutMapping("/check-out")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<AttendanceDTO> checkOut(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(attendanceService.checkOut(userDetails.getId()));
    }
}
