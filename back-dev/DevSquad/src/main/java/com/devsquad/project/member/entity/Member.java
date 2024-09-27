package com.devsquad.project.member.entity;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.devsquad.auth.entity.User;
import com.devsquad.project.project.entity.Project;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@EntityListeners(AuditingEntityListener.class)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Member {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false)
	private Long id;
	
	@JoinColumn(name = "user_id", nullable = false)
	@ManyToOne
	private User user;
	
	@JoinColumn(name = "project_id", nullable = false)
	@ManyToOne
	private Project project;
	
	@Column(nullable = false)
	private String position;
	
	@Column(nullable = false)
	private boolean apply;
	
	
}
