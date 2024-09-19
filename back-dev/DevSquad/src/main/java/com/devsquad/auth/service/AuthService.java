package com.devsquad.auth.service;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.devsquad.auth.domain.SignUpRequest;
import com.devsquad.auth.domain.SignUpResponse;
import com.devsquad.auth.domain.UserDeleteRequest;
import com.devsquad.auth.entity.User;
import com.devsquad.auth.repository.UserRepository;
import com.devsquad.common.jwt.JwtProvider;
import com.devsquad.common.utils.TokenUtils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
	private final UserRepository userRepo;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final JwtProvider jwtProvider;
	private final TokenUtils tokenUtils;
	
	// 회원가입 서비스 계층
	public SignUpResponse signUp(SignUpRequest req) {
		// BCryptPasswordEncoder를 통해 패스워드 암호화
		String encodedPassword = bCryptPasswordEncoder.encode(req.getPassword());
		// Repo를 통해 생성하기 위해 User 인스턴스로 생성, Set 해주기
		User user = User.builder()
			.name(req.getName())
			.nickName(req.getNickName())
			.email(req.getEmail())
			.password(encodedPassword) // 암호화된 password 사용
			.birth(req.getBirth())
			.build();
		// Repo를 통해 유저를 생성(저장)
		User savedUser = userRepo.save(user);
		// return은 Response 형식으로 변환
		return SignUpResponse.toDTO(savedUser);
	}

	// 이메일 중복 확인
	public boolean duplicateCheckEmail(String email) {
		return !userRepo.existsByEmailAndDeletedAtIsNull(email);
	}
	
	// 회원 정보 수정
	
	// 회원 탈퇴
	public void deleteUser(UserDeleteRequest userDeleteRequest) {
		// 이메일을 통해 user를 가져오기
		User user = userRepo.findByEmailAndDeletedAtIsNull(userDeleteRequest.getEmail());
		// user가 null이라면 찾을 수 없다는 에러 메세지 던지기
		if (user == null) {
			throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
		}
		// 입력한 password를 암호화된 password와 비교 후 틀리면 에러 던지기
		if (!bCryptPasswordEncoder.matches(userDeleteRequest.getPassword(), user.getPassword())) {
			throw new RuntimeException("비밀번호가 틀렸습니다.");
		}
		// deletedAt을 현재 시간으로 설정 후 업데이트
		user.setDeletedAt(LocalDateTime.now());
		userRepo.save(user);
	}

	// 토큰 추출 함수
	private String extractRefreshTokenFromCookie(HttpServletRequest req) {
		// 쿠키들을 가져옵니다
		Cookie[] cookies = req.getCookies();
		// 쿠키가 있다면
		if (cookies != null) {
			// 쿠키들을 살펴보는데
			 for (Cookie c : cookies) {
				 // 만약 refreshToken에 해당하는 key값이 있다면
				 if (c.getName().equals("refreshToken")) {
					 // 해당 value값(refreshToken)을 반환
					 return c.getValue();
				 }
			 }
		}
		// 없다면 null 반환
		return null;
	}
	
	// 토큰 재발급 서비스
	public Map<String, String> refreshToken(HttpServletRequest req) {
		// 쿠키에서 RefreshToken 추출
		String refreshToken = extractRefreshTokenFromCookie(req);
		// 토큰이 없거나 유효한 토큰이 아니라면 null 반환
		if (refreshToken == null || !jwtProvider.validateToken(refreshToken)) {
			return null;
		}
		// 유효한 토큰에서 이메일 추출
		String userEmail = jwtProvider.getUserEamilByToken(refreshToken);
		log.info("추출한 이메일 -> {}", userEmail);
		
		// 이메일을 통해 사용자를 조회하고 refreshToken 비교
		User user = userRepo.findByEmailAndDeletedAtIsNull(userEmail);
		// user가 없거나 user의 refreshToken이 같지 않다면 null 반환
		if (user == null || !user.getRefreshToken().equals(refreshToken)) {
			return null;
		}
		
		// 새로운 토큰 생성 후 DB에 refreshToken 저장
		Map<String, String> tokenMap = tokenUtils.generateToken(user);
		user.setRefreshToken(tokenMap.get("refreshToken"));
		userRepo.save(user);
		
		return tokenMap;
	}



}
