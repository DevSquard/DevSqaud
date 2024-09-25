package com.devsquad.project.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsquad.auth.entity.User;
import com.devsquad.project.project.entity.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long>{

	List<Project> findByUser(User user);

}
