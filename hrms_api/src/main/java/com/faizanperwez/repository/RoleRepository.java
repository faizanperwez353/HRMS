package com.faizanperwez.repository;

import com.faizanperwez.model.ERole;
import com.faizanperwez.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(ERole name);
}
