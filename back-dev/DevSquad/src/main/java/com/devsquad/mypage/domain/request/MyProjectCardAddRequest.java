package com.devsquad.mypage.domain.request;

import com.devsquad.auth.entity.User;
import com.devsquad.mypage.entity.MyProjectCard;

import lombok.Data;

@Data
public class MyProjectCardAddRequest {
	private Long id;
	private String title;
	private String content;
	private String image;
	private Long userId;

	public MyProjectCard toEntity(User user) {
		return MyProjectCard.builder().title(title).content(content).image(image).user(user).build();
	}
}
