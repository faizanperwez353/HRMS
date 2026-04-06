package com.faizanperwez.repository;

import com.faizanperwez.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Optional<Department> findByName(String name);
    Boolean existsByName(String name);
}
