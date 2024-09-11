package com.devsquard.mypage.controller;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.devsquard.mypage.domain.request.MyProfileCardRequest;
import com.devsquard.mypage.domain.response.MyProfileCardResponse;
import com.devsquard.mypage.service.MyProfileCardService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@Tag(name = "[마이페이지]프로필 카드", description = "마이페이지 관련 API")
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MyProfileCardController {
	private final MyProfileCardService myProfileCardService;

	@Operation(summary = "프로필 불러오기", description = "프로필을 불러옵니다.")
	@GetMapping("/{id}")
	public ResponseEntity<MyProfileCardResponse> getUserById(@PathVariable("id") Long id) {
		MyProfileCardResponse res = myProfileCardService.getUserById(id);
		return ResponseEntity.ok(res);
	}

	@Operation(summary = "프로필 수정하기", description = "프로필을 수정합니다")
	@PatchMapping("/")
	public ResponseEntity<MyProfileCardResponse> updateProfile(MyProfileCardRequest req) {

		System.out.println("프로필 업데이트 요청 데이터 : " + req);
		MyProfileCardResponse res = myProfileCardService.updateProfile(req);
		return ResponseEntity.ok(res);
	}
}
