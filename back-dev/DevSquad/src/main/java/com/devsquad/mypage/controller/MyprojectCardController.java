package com.devsquad.mypage.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsquad.mypage.domain.request.MyProjectCardAddRequest;
import com.devsquad.mypage.domain.request.MyProjectCardDeleteRequest;
import com.devsquad.mypage.domain.response.MyProjectCardResponse;
import com.devsquad.mypage.service.MyprojectCardService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/devsquad/mypage/projectcard")
public class MyprojectCardController {
	private final MyprojectCardService myprojectCardService;

	// 카드추가
	@Operation(summary = "카드 등록하기", description = "프로젝트 카드를 등록합니다")
	@PostMapping("")
	public ResponseEntity<MyProjectCardResponse> addProjectCard(MyProjectCardAddRequest projectCard) {
		MyProjectCardResponse savedProjectCard = myprojectCardService.addProjectCard(projectCard);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedProjectCard);
	}

	// 카드삭제
	@DeleteMapping("/{id}")
	public ResponseEntity<MyProjectCardResponse> deleteProjectCard(@PathVariable("id") Long id,
			@RequestBody MyProjectCardDeleteRequest projectCard) {
		MyProjectCardResponse deleteProjectCard = myprojectCardService.deleteProjectCard(id, projectCard);
		return ResponseEntity.ok(deleteProjectCard);
	}
}
