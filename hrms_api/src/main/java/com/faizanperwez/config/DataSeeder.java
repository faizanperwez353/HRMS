package com.faizanperwez.config;

import com.faizanperwez.model.Department;
import com.faizanperwez.model.ERole;
import com.faizanperwez.model.Role;
import com.faizanperwez.model.User;
import com.faizanperwez.repository.DepartmentRepository;
import com.faizanperwez.repository.RoleRepository;
import com.faizanperwez.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataSeeder.class);

    @Autowired RoleRepository roleRepository;
    @Autowired UserRepository userRepository;
    @Autowired DepartmentRepository departmentRepository;
    @Autowired PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedRoles();
        seedDepartments();
        seedAdminUser();
        seedEmployeeUser();
    }

    private void seedRoles() {
        if (roleRepository.findByName(ERole.ROLE_EMPLOYEE).isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_EMPLOYEE));
        }
        if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_ADMIN));
        }
        if (roleRepository.findByName(ERole.ROLE_HR).isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_HR));
        }
        if (roleRepository.findByName(ERole.ROLE_MANAGER).isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_MANAGER));
        }
        logger.info("✅ Roles verified/seeded: EMPLOYEE, ADMIN, HR, MANAGER");
    }

    private void seedDepartments() {
        if (departmentRepository.count() == 0) {
            saveDepartment("IT", "Information Technology Department");
            saveDepartment("HR", "Human Resources Department");
            saveDepartment("Finance", "Finance and Accounting Department");
            saveDepartment("Marketing", "Marketing and Sales Department");
            saveDepartment("Operations", "Operations Management");
            logger.info("✅ Default departments seeded: IT, HR, Finance, Marketing, Operations");
        }
    }

    private void saveDepartment(String name, String description) {
        Department dept = new Department();
        dept.setName(name);
        dept.setDescription(description);
        departmentRepository.save(dept);
    }

    private void seedAdminUser() {
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User("admin", "admin@hrms.com",
                    passwordEncoder.encode("admin123"));

            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Admin role not found"));
            admin.setRoles(Set.of(adminRole));
            userRepository.save(admin);

            logger.info("✅ Default admin user created → username: admin / password: admin123");
        } else {
            logger.info("ℹ️ Admin user already exists, skipping seed.");
        }
    }

    private void seedEmployeeUser() {
        if (!userRepository.existsByUsername("user")) {
            User user = new User("user", "user@hrms.com",
                    passwordEncoder.encode("user123"));

            Role userRole = roleRepository.findByName(ERole.ROLE_EMPLOYEE)
                    .orElseThrow(() -> new RuntimeException("Employee role not found"));
            user.setRoles(Set.of(userRole));
            userRepository.save(user);

            logger.info("✅ Default employee user created → username: user / password: user123");
        } else {
            logger.info("ℹ️ Employee user already exists, skipping seed.");
        }
    }
}
