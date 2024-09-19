package com.devsquad.mypage.domain.request;

import com.devsquad.auth.entity.User;
import com.devsquad.mypage.entity.MyProjectCard;

import lombok.Data;

@Data
public class MyProjectCardEditRequest {
	private Long id;
	private Long userId;

	public MyProjectCard toEntity(User user) {
		return MyProjectCard.builder().user(user).build();
	}
}
