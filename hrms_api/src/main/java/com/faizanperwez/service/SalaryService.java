package com.faizanperwez.service;

import com.faizanperwez.dto.SalaryDTO;
import com.faizanperwez.model.Employee;
import com.faizanperwez.model.Salary;
import com.faizanperwez.repository.EmployeeRepository;
import com.faizanperwez.repository.SalaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SalaryService {

    @Autowired SalaryRepository salaryRepository;
    @Autowired EmployeeRepository employeeRepository;

    public List<SalaryDTO> getAllSalaries() {
        return salaryRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<SalaryDTO> getSalariesByEmployee(Long employeeId) {
        return salaryRepository.findByEmployeeId(employeeId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public SalaryDTO getSalaryById(Long id) {
        return toDTO(salaryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salary record not found: " + id)));
    }

    public SalaryDTO createSalary(SalaryDTO dto) {
        Salary salary = toEntity(new Salary(), dto);
        return toDTO(salaryRepository.save(salary));
    }

    public SalaryDTO updateSalary(Long id, SalaryDTO dto) {
        Salary salary = salaryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salary record not found: " + id));
        salary = toEntity(salary, dto);
        return toDTO(salaryRepository.save(salary));
    }

    public void deleteSalary(Long id) {
        if (!salaryRepository.existsById(id))
            throw new RuntimeException("Salary record not found: " + id);
        salaryRepository.deleteById(id);
    }

    private Salary toEntity(Salary salary, SalaryDTO dto) {
        Employee emp = employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found: " + dto.getEmployeeId()));
        salary.setEmployee(emp);
        salary.setBasicSalary(dto.getBasicSalary());
        salary.setBonus(dto.getBonus());
        salary.setDeductions(dto.getDeductions());
        salary.setPaymentDate(dto.getPaymentDate());
        salary.setPaymentMonth(dto.getPaymentMonth());
        salary.setStatus(dto.getStatus());
        return salary;
    }

    private SalaryDTO toDTO(Salary salary) {
        SalaryDTO dto = new SalaryDTO();
        dto.setId(salary.getId());
        dto.setEmployeeId(salary.getEmployee().getId());
        dto.setEmployeeName(salary.getEmployee().getFirstName() + " " + salary.getEmployee().getLastName());
        dto.setBasicSalary(salary.getBasicSalary());
        dto.setBonus(salary.getBonus());
        dto.setDeductions(salary.getDeductions());
        dto.setPaymentDate(salary.getPaymentDate());
        dto.setPaymentMonth(salary.getPaymentMonth());
        dto.setStatus(salary.getStatus());
        return dto;
    }
}
