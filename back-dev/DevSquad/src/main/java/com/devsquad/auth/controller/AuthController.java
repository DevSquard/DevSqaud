package com.devsquad.auth.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devsquad.auth.domain.LoginRequest;
import com.devsquad.auth.domain.SignUpRequest;
import com.devsquad.auth.domain.UserDeleteRequest;
import com.devsquad.auth.domain.response.LoginResponse;
import com.devsquad.auth.domain.response.SignUpResponse;
import com.devsquad.auth.domain.response.UserInfoResponse;
import com.devsquad.auth.entity.User;
import com.devsquad.auth.service.AuthService;
import com.devsquad.common.utils.TokenUtils;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@Tag(name = "Auth", description = "사용자 로그인 관련 API")
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
	private final AuthService authService;
	private final TokenUtils tokenUtils;
	
	// 회원 가입
	@Operation(summary = "회원가입", description = "회원가입을 진행합니다.")
	@PostMapping("/signup")
	public ResponseEntity<SignUpResponse> signUp(@RequestBody SignUpRequest req) {
		log.info("[SignUp] 회원가입 진행 요청 정보 : {}", req);
		SignUpResponse signUpResponse = authService.signUp(req);
		return ResponseEntity.status(HttpStatus.CREATED).body(signUpResponse);
	}
	
	// 이메일 중복확인
	@Operation(summary = "이메일 중복 확인", description = "이메일 중복을 확인합니다. 중복이 없으면 true, 중복은 false를 반환")
	@GetMapping("/duplicate")
	public ResponseEntity<Boolean> emailCheck(@RequestParam("email") String email) {
		// 삭제된 유저를 제외하고 Email이 존재하는지 찾아서 
		boolean isNotDuplicate = authService.duplicateCheckEmail(email);
		return ResponseEntity.ok(isNotDuplicate);
	}
	
	// 회원 정보 수정
	// 수정 고민
	
	// 회원 탈퇴
	@Operation(summary = "회원탈퇴", description = "회원탈퇴를 Soft-Delete로 진행합니다.")
	@PatchMapping("/delete")
	public ResponseEntity<?> userWithdrawal(@RequestBody UserDeleteRequest userDeleteRequest) {
		try {
			authService.deleteUser(userDeleteRequest);
			return ResponseEntity.ok(null);
		} catch (UsernameNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
		}
	}
	
	// 토큰 재발급
	@Operation(summary = "토큰 재발급", description = "토큰을 재발급합니다.")
	@PostMapping("/refresh-token")
	public ResponseEntity<LoginResponse> refreshToken(HttpServletRequest req, HttpServletResponse res) {
		// 토큰 요청
		Map<String, String> tokenMap = authService.refreshToken(req);
		
		// 토큰 재발급 불가 -> 401 반환
		if (tokenMap == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}
		
		// 헤더 Cookie로 refresh 토큰 재발급
		tokenUtils.setRefreshTokenCookie(res, tokenMap.get("refreshTojen"));
		
		// 200을 반환함과 동시에 Body에 LoginResponse(accessToken)를 담아서 보냄
		return ResponseEntity.ok(
				LoginResponse.builder()
				.accessToken(tokenMap.get("accessToken"))
				.build());
	}

	// 미니 프로필 회원 정보 불러오기
	@Operation(summary = "미니 프로필", description = "미니 프로필을 불러옵니다.")
	@GetMapping("/my-info")
	public ResponseEntity<UserInfoResponse> getMyInfo(@AuthenticationPrincipal User user) {
		log.info("[getMyInfo] 유저 미니 프로필 불러오기");
		UserInfoResponse userInfo = authService.getMyInfo(user.getEmail());
		return ResponseEntity.ok().body(userInfo);
	}
	
	// 사용자 스트릭 찍기
	@Operation(summary = "사용자 스트릭", description = "최근 로그인 기준으로 스트릭을 기록합니다.")
	@PostMapping("/streak-count")
	public void countStreak(@AuthenticationPrincipal User user) {
		authService.userStreakCounter(user);
	}
}
