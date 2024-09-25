package com.devsquad.mypage.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsquad.community.domain.PostResponse;
import com.devsquad.mypage.service.MyPostListService;
import com.devsquad.mypage.service.MyProjectListService;
import com.devsquad.project.project.domain.ProjectResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequiredArgsConstructor
@Tag(name = "마이페이지", description = "마이페이지 관련 api")
@RequestMapping("/api/devsquad")
public class MyActivityListController {
	private final MyPostListService myPostListService;
	private final MyProjectListService myProjectListService;

	// 내 게시글 목록
	@Operation(summary = "나의 게시글 조회하기", description = "게시글을 조회합니다")
	@GetMapping("/posts")
	public ResponseEntity<List<PostResponse>> getMyPostList(@RequestParam(name = "id", required = false) Long userId) {
		List<PostResponse> myPosts = myPostListService.getPostsByUserId(userId);
		return ResponseEntity.ok(myPosts);
	}

	// 내가 작성한 프로젝트 목록
	@Operation(summary = "내가 작성한 프로젝트 조회", description = "내가 작성한 프로젝트를 조회합니다")
	@GetMapping("/projects")
	public ResponseEntity<List<ProjectResponse>> getMyProjectList(
			@RequestParam(name = "id", required = false) Long userId) {
		List<ProjectResponse> myProjects = myProjectListService.getPostsByUserId(userId);
		return ResponseEntity.ok(myProjects);
	}

}
