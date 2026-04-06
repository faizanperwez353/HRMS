package com.faizanperwez.repository;

import com.faizanperwez.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);
    Optional<Employee> findByUserId(Long userId);
    List<Employee> findByDepartmentId(Long departmentId);
    Boolean existsByEmail(String email);
}
