package com.faizanperwez.service;

import com.faizanperwez.dto.AppraisalDTO;
import com.faizanperwez.model.Appraisal;
import com.faizanperwez.model.Employee;
import com.faizanperwez.repository.AppraisalRepository;
import com.faizanperwez.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppraisalService {

    @Autowired AppraisalRepository appraisalRepository;
    @Autowired EmployeeRepository employeeRepository;

    public List<AppraisalDTO> getAllAppraisals() {
        return appraisalRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<AppraisalDTO> getAppraisalsByEmployee(Long employeeId) {
        return appraisalRepository.findByEmployeeId(employeeId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public AppraisalDTO getAppraisalById(Long id) {
        return toDTO(appraisalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appraisal not found: " + id)));
    }

    public AppraisalDTO createAppraisal(AppraisalDTO dto) {
        return toDTO(appraisalRepository.save(toEntity(new Appraisal(), dto)));
    }

    public AppraisalDTO updateAppraisal(Long id, AppraisalDTO dto) {
        Appraisal appraisal = appraisalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appraisal not found: " + id));
        return toDTO(appraisalRepository.save(toEntity(appraisal, dto)));
    }

    public void deleteAppraisal(Long id) {
        if (!appraisalRepository.existsById(id))
            throw new RuntimeException("Appraisal not found: " + id);
        appraisalRepository.deleteById(id);
    }

    private Appraisal toEntity(Appraisal appraisal, AppraisalDTO dto) {
        Employee emp = employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found: " + dto.getEmployeeId()));
        appraisal.setEmployee(emp);
        appraisal.setRating(dto.getRating());
        appraisal.setFeedback(dto.getFeedback());
        appraisal.setReviewedBy(dto.getReviewedBy());
        appraisal.setReviewDate(dto.getReviewDate());
        appraisal.setPeriod(dto.getPeriod());
        return appraisal;
    }

    private AppraisalDTO toDTO(Appraisal appraisal) {
        AppraisalDTO dto = new AppraisalDTO();
        dto.setId(appraisal.getId());
        dto.setEmployeeId(appraisal.getEmployee().getId());
        dto.setEmployeeName(appraisal.getEmployee().getFirstName() + " " + appraisal.getEmployee().getLastName());
        dto.setRating(appraisal.getRating());
        dto.setFeedback(appraisal.getFeedback());
        dto.setReviewedBy(appraisal.getReviewedBy());
        dto.setReviewDate(appraisal.getReviewDate());
        dto.setPeriod(appraisal.getPeriod());
        return dto;
    }
}
