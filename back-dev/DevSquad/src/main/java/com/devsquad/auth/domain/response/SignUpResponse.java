package com.devsquad.auth.domain.response;

import java.time.LocalDate;

import com.devsquad.auth.entity.User;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SignUpResponse {
	private Long id;
	private String name, nickName, email;
	private LocalDate birth;
	
	public static SignUpResponse toDTO(User user) {
		return SignUpResponse.builder()
			.id(user.getId())
			.name(user.getName())
			.nickName(user.getNickName())
			.email(user.getEmail())
			.birth(user.getBirth())
			.build();
	}
}
