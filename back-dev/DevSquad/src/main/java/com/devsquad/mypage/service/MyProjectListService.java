package com.devsquad.mypage.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.devsquad.auth.entity.User;
import com.devsquad.auth.repository.UserRepository;
import com.devsquad.project.project.domain.ProjectResponse;
import com.devsquad.project.project.repository.ProjectRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MyProjectListService {
	private final UserRepository userRepository;
	private final ProjectRepository projectRepository;

	// 내가 작성한 프로젝트 목록
	public List<ProjectResponse> getPostsByUserId(Long userId) {
		User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다"));

		List<ProjectResponse> myProjectList = projectRepository.findByUser(user).stream().map(ProjectResponse::toDTO).toList();

		return myProjectList;
	}
}
