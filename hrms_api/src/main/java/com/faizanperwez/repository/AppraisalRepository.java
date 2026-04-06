package com.faizanperwez.repository;

import com.faizanperwez.model.Appraisal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AppraisalRepository extends JpaRepository<Appraisal, Long> {
    List<Appraisal> findByEmployeeId(Long employeeId);
}
