package com.devsquad.mypage.domain.request;

import com.devsquad.auth.entity.User;
import com.devsquad.mypage.entity.MyProjectCard;

import lombok.Data;

@Data
public class MyProjectCardDeleteRequest {

	private Long id;

	public MyProjectCard toEntity(User user) {
		return MyProjectCard.builder().user(user).build();
	}
}
