package com.devsquad.auth.domain.response;

import com.devsquad.auth.entity.User;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInfoResponse {
	private final String nickname;
	private final int hotLevel;
	private final int streakCount;
	
	public static UserInfoResponse toDTO(User user) {
		return UserInfoResponse.builder()
			.nickname(user.getNickName())
			.hotLevel(user.getHotLevel())
			.streakCount(user.getStreakCount())
			.build();
	}
}
