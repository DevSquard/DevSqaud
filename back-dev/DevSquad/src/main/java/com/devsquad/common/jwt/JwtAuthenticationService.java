package com.devsquad.common.jwt;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.devsquad.auth.domain.LoginResponse;
import com.devsquad.auth.entity.User;
import com.devsquad.auth.repository.UserRepository;
import com.devsquad.common.utils.TokenUtils;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtAuthenticationService {
	private final TokenUtils tokenUtils;
	private final UserRepository userRepo;
	
	void successAuthentication(HttpServletResponse res, Authentication authResult) throws IOException {
		// 인증된 사용자 (로그인한) 가져오기
		User user = (User) authResult.getPrincipal();
		Map<String, String> tokenMap = tokenUtils.generateToken(user);
		String accessToken = tokenMap.get("accessToken");
		String refreshToken = tokenMap.get("refreshToken");
		
		// 리프레시 토큰을 DB에 저장
		user.setRefreshToken(refreshToken);
		// 유저 로그인 스탬프 찍기
		user.setLoginedAt(LocalDateTime.now());
		userRepo.save(user);
		
		// 생성된 리프레시 토큰을 쿠키에 담아 응답
		tokenUtils.setRefreshTokenCookie(res, refreshToken);
		
		// 생성된 액세스 토큰을 LoginResponse에 담아 응답
		LoginResponse loginResponse = LoginResponse.builder().accessToken(accessToken).build();
		tokenUtils.writeResponse(res, loginResponse);
	}
}
