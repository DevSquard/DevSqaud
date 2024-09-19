package com.devsquad.oauth.service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import com.devsquad.auth.entity.User;
import com.devsquad.auth.repository.UserRepository;
import com.devsquad.common.utils.OAuth2Properties;
import com.devsquad.common.utils.TokenUtils;
import com.fasterxml.jackson.databind.JsonNode;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OAuthService {
	private final OAuth2Properties oAuth2Properties;
	private final UserRepository userRepo;
	private final TokenUtils tokenUtils;
	
	public String oAuthSignIn(String code, String provider, HttpServletResponse res) {
		// 1. code를 통해 provider에서 제공하는 accessToken을 가져온다.
		String providedAccessToken = getAccessToken(code, provider);
		// 2. provider에서 제공하는 accessToken으로 사용자 정보를 추출한다.
		User user = generateOAuthUser(providedAccessToken, provider);
		System.out.println(providedAccessToken);
		// 3. 사용자 정보를 조회하고
		// 만약 기존에 있는 사용자라면 (oauth 인증 여부에 따라 oauth true로 변경)
		// 만약 기존에 없는 사용자라면 (새로 가입 _ DB 추가)
		user = userRepo.findByEmailAndDeletedAtIsNull(user.getEmail()).orElse(user);		
		// 추후 이부분은 따로 입력을 더 받을 예정 (지금은 임시 작업)
		user.setNickName(user.getName());
		user.setBirth(LocalDate.now());
		// -----------------------------------------
		if (!user.isOAuth()) {
			user.setOAuth(true);
		}
		// 4. 자동 로그인(사용자에 대한 정보로 accessToken과 refreshToken을 만들어서 반환)
		Map<String, String> tokenMap = tokenUtils.generateToken(user);
		// DB에 기록(refresh)
		user.setRefreshToken(tokenMap.get("refreshToken"));
		userRepo.save(user);
		// Header에 추가
		tokenUtils.setRefreshTokenCookie(res, tokenMap.get("refreshToken"));
		// BODY에 추가(access)
		return tokenMap.get("accessToken");
	}

	private String getAccessToken(String code, String provider) {
		// 설정 가져오기
		OAuth2Properties.Client client = oAuth2Properties.getClients().get(provider);
		
		// 1. code를 통해 google에서 제공하는 accessToken을 가져온다.
		String decodedCode = URLDecoder.decode(code, StandardCharsets.UTF_8);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
		headers.setBasicAuth(client.getClientId(), client.getClientSecret());
		
		MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
		params.add("client_id", client.getClientId());
		params.add("client_secret", client.getClientSecret());
		params.add("code", decodedCode);
		params.add("grant_type", "authorization_code");
		params.add("redirect_uri", client.getRedirectUri());
		
		RestTemplate rt = new RestTemplate();
		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);
		ResponseEntity<Map> responseEntity = rt.postForEntity(client.getTokenUri(), requestEntity, Map.class);
		
		if (!responseEntity.getStatusCode().is2xxSuccessful() || responseEntity.getBody() == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "사용자 정보를 가져올 수 없음");
		}
		
		return (String) responseEntity.getBody().get("access_token");
	}


	private User generateOAuthUser(String accessToken, String provider) {
		// 설정 가져오기
		OAuth2Properties.Client client = oAuth2Properties.getClients().get(provider);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + accessToken);
		
		RestTemplate rt = new RestTemplate();
		ResponseEntity<JsonNode> responseEntity = rt.exchange(client.getUserInfoRequestUri(), HttpMethod.GET, new HttpEntity<>(headers), JsonNode.class);
		System.out.println(responseEntity.getBody());

		if (!responseEntity.getStatusCode().is2xxSuccessful() || responseEntity.getBody() == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "사용자 정보를 가져올 수 없음");
		}
		
		JsonNode jsonNode = responseEntity.getBody();
		String email = null;
		String name = null;
		User user = null;
		
		// 왜 try-catch 쓰는지 잘 모르겠음.
		try {
			if (jsonNode.has("email") && jsonNode.has("name")) {
				email = jsonNode.get("email").asText();
				name = jsonNode.get("name").asText();
				user = User.builder()
						.email(email)
						.name(name)
						.oAuth(true)
						.build();
			} else if (jsonNode.has("id") && jsonNode.has("properties")) {
				email = jsonNode.get("id").asText() + "@kakao.com";
				name = jsonNode.get("properties").get("nickname").asText();
				user = User.builder()
						.email(email)
						.name(name)
						.oAuth(true)
						.build();
			} else {
				throw new RuntimeException("해당 사용자를 찾을 수 없습니다.");
			}
		} catch (RuntimeException e) {
			throw new RuntimeException("해당 사용자를 찾을 수 없습니다.");
		}
		
		return user;
	}


}
