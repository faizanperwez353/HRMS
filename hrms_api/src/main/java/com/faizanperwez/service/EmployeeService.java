package com.faizanperwez.service;

import com.faizanperwez.dto.EmployeeDTO;
import com.faizanperwez.model.*;
import com.faizanperwez.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired EmployeeRepository employeeRepository;
    @Autowired DepartmentRepository departmentRepository;
    @Autowired ProjectRepository projectRepository;
    @Autowired SkillRepository skillRepository;
    @Autowired UserRepository userRepository;

    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public EmployeeDTO getEmployeeById(Long id) {
        return toDTO(employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found: " + id)));
    }

    public EmployeeDTO getEmployeeByUserId(Long userId) {
        return toDTO(employeeRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Employee profile not found for user: " + userId)));
    }

    @Transactional
    public EmployeeDTO createEmployee(EmployeeDTO dto) {
        Employee emp = toEntity(new Employee(), dto);
        return toDTO(employeeRepository.save(emp));
    }

    @Transactional
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO dto) {
        Employee emp = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found: " + id));
        emp = toEntity(emp, dto);
        return toDTO(employeeRepository.save(emp));
    }

    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id))
            throw new RuntimeException("Employee not found: " + id);
        employeeRepository.deleteById(id);
    }

    private Employee toEntity(Employee emp, EmployeeDTO dto) {
        emp.setFirstName(dto.getFirstName());
        emp.setLastName(dto.getLastName());
        emp.setEmail(dto.getEmail());
        emp.setPhone(dto.getPhone());
        emp.setAddress(dto.getAddress());
        emp.setDateOfBirth(dto.getDateOfBirth());
        emp.setJoiningDate(dto.getJoiningDate());
        emp.setDesignation(dto.getDesignation());
        emp.setEmploymentType(dto.getEmploymentType());
        emp.setStatus(dto.getStatus());

        if (dto.getDepartmentId() != null) {
            emp.setDepartment(departmentRepository.findById(dto.getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found")));
        }
        if (dto.getUserId() != null) {
            emp.setUser(userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found")));
        }
        if (dto.getProjectIds() != null) {
            emp.setProjects(projectRepository.findAllById(dto.getProjectIds()));
        }
        if (dto.getSkillIds() != null) {
            emp.setSkills(skillRepository.findAllById(dto.getSkillIds()));
        }
        return emp;
    }

    public EmployeeDTO toDTO(Employee emp) {
        EmployeeDTO dto = new EmployeeDTO();
        dto.setId(emp.getId());
        dto.setFirstName(emp.getFirstName());
        dto.setLastName(emp.getLastName());
        dto.setEmail(emp.getEmail());
        dto.setPhone(emp.getPhone());
        dto.setAddress(emp.getAddress());
        dto.setDateOfBirth(emp.getDateOfBirth());
        dto.setJoiningDate(emp.getJoiningDate());
        dto.setDesignation(emp.getDesignation());
        dto.setEmploymentType(emp.getEmploymentType());
        dto.setStatus(emp.getStatus());
        if (emp.getDepartment() != null) {
            dto.setDepartmentId(emp.getDepartment().getId());
            dto.setDepartmentName(emp.getDepartment().getName());
        }
        if (emp.getUser() != null) {
            dto.setUserId(emp.getUser().getId());
            dto.setUsername(emp.getUser().getUsername());
        }
        if (emp.getProjects() != null) {
            dto.setProjectIds(emp.getProjects().stream().map(Project::getId).collect(Collectors.toList()));
        }
        if (emp.getSkills() != null) {
            dto.setSkillIds(emp.getSkills().stream().map(Skill::getId).collect(Collectors.toList()));
        }
        return dto;
    }
}
