package com.devsquad.project.project.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsquad.project.project.domain.ProjectRequest;
import com.devsquad.project.project.domain.ProjectResponse;
import com.devsquad.project.project.service.ProjectService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@Tag(name = "프로젝트", description = "프로젝트 관련 API")
@RequestMapping("/api/project")
@RequiredArgsConstructor
public class ProjectController {
	private final ProjectService projectService;
	
	@Operation(summary = "프로젝트 추가", description = "프로젝트를 생성합니다.")
	@PostMapping("/create")//프로젝트 추가
	public ResponseEntity<ProjectResponse> addProject(@RequestBody ProjectRequest pro){
		log.info("[addProject] 프로젝트 생성 정보 : {}", pro);
		// 프로젝트 입력 정보 + 해당 유저정보를 Repository로 넘겨줌
		ProjectResponse savedpro = projectService.addProject(pro);
		// 201 상태를 넘겨주고, Project 객체를 리턴
		return ResponseEntity.status(HttpStatus.CREATED).body(savedpro);
	}
	
	@Operation(summary = "프로젝트 목록 조회", description = "프로젝트 목록을 반환합니다.")
	@GetMapping("")//프로젝트 전체 리스트
	public ResponseEntity<List<ProjectResponse>> getAllProject(){
		//프로젝트 서비스에게 프로젝트 목록 조회 부탁
		List<ProjectResponse> li = projectService.getAllProject();
		//프로젝트 목록 반환
		return ResponseEntity.ok(li);
	}
	
	@Operation(summary = "특정 프로젝트 조회", description = "특정 프로젝트를 반환합니다.")
	@GetMapping("/{id}")//특정 프로젝트 보기
	public ResponseEntity<ProjectResponse> getProject(@PathVariable("id") Long id){
		//프로젝트 서비스에게 특정 프로젝트 조회 부탁
		ProjectResponse pro = projectService.getProject(id);
		//특정 프로젝트 반환
		return ResponseEntity.ok(pro);
	}
	
	@Operation(summary = "프로젝트 삭제", description = "특정 프로젝트를 삭제합니다.")
	@DeleteMapping("/{id}")//프로젝트 삭제
	public ResponseEntity<ProjectResponse> deleteProject(@PathVariable("id") Long id){
		//프로젝트 서비스에게 프로젝트 삭제 부탁
		ProjectResponse dpro = projectService.deleteProject(id);
		//삭제된 프로젝트 반환
		return ResponseEntity.ok(dpro);
	}
	
	@Operation(summary = "프로젝트 수정", description = "특정 프로젝트를 수정합니다.")
	@PatchMapping("")//프로젝트 수정
	public ResponseEntity<ProjectResponse> updateProject(ProjectRequest pro){
		//프로젝트 서비스에게 프로젝트 수정 부탁
		ProjectResponse upro = projectService.updateProject(pro);
		//수정된 프로젝트 반환
		return ResponseEntity.ok(upro);
	}
	
	
}
