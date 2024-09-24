package com.devsquad.mypage.domain.response;

import com.devsquad.auth.entity.User;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyProfileCardResponse {
	private Long id;
	private String nickName, language, intro;
	private int streakCount;
	private boolean[] streakDaysInMonth;

	public static MyProfileCardResponse toDTO(User user) {

		return MyProfileCardResponse.builder().id(user.getId()).nickName(user.getNickName()).language(user.getLanguage())
				.streakCount(user.getStreakCount()).intro(user.getIntro()).build();
	}
}
