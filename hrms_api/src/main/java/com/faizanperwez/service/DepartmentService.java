package com.faizanperwez.service;

import com.faizanperwez.dto.DepartmentDTO;
import com.faizanperwez.model.Department;
import com.faizanperwez.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentService {

    @Autowired DepartmentRepository departmentRepository;

    public List<DepartmentDTO> getAllDepartments() {
        return departmentRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public DepartmentDTO getDepartmentById(Long id) {
        return toDTO(departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found: " + id)));
    }

    public DepartmentDTO createDepartment(DepartmentDTO dto) {
        if (departmentRepository.existsByName(dto.getName()))
            throw new RuntimeException("Department already exists: " + dto.getName());
        Department dept = new Department();
        dept.setName(dto.getName());
        dept.setDescription(dto.getDescription());
        return toDTO(departmentRepository.save(dept));
    }

    public DepartmentDTO updateDepartment(Long id, DepartmentDTO dto) {
        Department dept = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found: " + id));
        dept.setName(dto.getName());
        dept.setDescription(dto.getDescription());
        return toDTO(departmentRepository.save(dept));
    }

    public void deleteDepartment(Long id) {
        if (!departmentRepository.existsById(id))
            throw new RuntimeException("Department not found: " + id);
        departmentRepository.deleteById(id);
    }

    private DepartmentDTO toDTO(Department dept) {
        DepartmentDTO dto = new DepartmentDTO();
        dto.setId(dept.getId());
        dto.setName(dept.getName());
        dto.setDescription(dept.getDescription());
        dto.setEmployeeCount(dept.getEmployees() != null ? dept.getEmployees().size() : 0);
        return dto;
    }
}
