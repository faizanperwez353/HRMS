package com.faizanperwez.service;

import com.faizanperwez.dto.ProjectDTO;
import com.faizanperwez.model.Project;
import com.faizanperwez.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired ProjectRepository projectRepository;

    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ProjectDTO getProjectById(Long id) {
        return toDTO(projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found: " + id)));
    }

    public ProjectDTO createProject(ProjectDTO dto) {
        Project project = toEntity(new Project(), dto);
        return toDTO(projectRepository.save(project));
    }

    public ProjectDTO updateProject(Long id, ProjectDTO dto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found: " + id));
        project = toEntity(project, dto);
        return toDTO(projectRepository.save(project));
    }

    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id))
            throw new RuntimeException("Project not found: " + id);
        projectRepository.deleteById(id);
    }

    private Project toEntity(Project project, ProjectDTO dto) {
        project.setName(dto.getName());
        project.setDescription(dto.getDescription());
        project.setStartDate(dto.getStartDate());
        project.setEndDate(dto.getEndDate());
        project.setStatus(dto.getStatus());
        return project;
    }

    private ProjectDTO toDTO(Project project) {
        ProjectDTO dto = new ProjectDTO();
        dto.setId(project.getId());
        dto.setName(project.getName());
        dto.setDescription(project.getDescription());
        dto.setStartDate(project.getStartDate());
        dto.setEndDate(project.getEndDate());
        dto.setStatus(project.getStatus());
        return dto;
    }
}
