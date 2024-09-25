package com.devsquad.mypage.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsquad.mypage.domain.request.MyProjectCardAddRequest;
import com.devsquad.mypage.domain.request.MyProjectCardDeleteRequest;
import com.devsquad.mypage.domain.request.MyProjectCardEditRequest;
import com.devsquad.mypage.domain.response.MyProjectCardResponse;
import com.devsquad.mypage.service.MyprojectCardService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequiredArgsConstructor
@Tag(name = "마이페이지", description = "마이페이지 관련 api")
@RequestMapping("/api/devsquad/mypage/projectcard")
public class MyprojectCardController {
	private final MyprojectCardService myprojectCardService;

	// 카드추가
	@Operation(summary = "프로젝트카드 등록하기", description = "프로젝트 카드를 등록합니다")
	@PostMapping("")
	public ResponseEntity<MyProjectCardResponse> addProjectCard(MyProjectCardAddRequest projectCard) {
		MyProjectCardResponse savedProjectCard = myprojectCardService.addProjectCard(projectCard);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedProjectCard);
	}

	// 카드삭제
	@Operation(summary = "프로젝트카드 삭제하기", description = "프로젝트 카드를 삭제합니다")
	@DeleteMapping("/{id}")
	public ResponseEntity<MyProjectCardResponse> deleteProjectCard(@PathVariable("id") Long id,
			@RequestBody MyProjectCardDeleteRequest projectCard) {
		MyProjectCardResponse deleteProjectCard = myprojectCardService.deleteProjectCard(id, projectCard);
		return ResponseEntity.ok(deleteProjectCard);
	}

	// 카드수정
	@Operation(summary = "프로젝트카드 수정하기", description = "프로젝트 카드를 수정합니다")
	@PatchMapping("")
	public ResponseEntity<MyProjectCardResponse> editProjectCard(MyProjectCardEditRequest projectCard) {
		MyProjectCardResponse editedProjectCard = myprojectCardService.editProjectCard(projectCard);
		return ResponseEntity.ok(editedProjectCard);
	}

	// 카드 리스트
	@Operation(summary = "프로젝트카드 리스트조회", description = "프로젝트 카드를 조회합니다")
	@GetMapping("")
	public ResponseEntity<List<MyProjectCardResponse>> getAllProjectCard(
			@RequestParam(name = "id", required = false) Long id) {
		List<MyProjectCardResponse> result = new ArrayList<>();
		if (id == null) {
			result = myprojectCardService.getAllProjectCard();
		}

		return ResponseEntity.ok(result);
	}

}
