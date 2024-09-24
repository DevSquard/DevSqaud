package com.devsquad.mypage.domain.response;


import com.devsquad.auth.domain.response.UserResponse;
import com.devsquad.mypage.entity.MyProjectCard;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyProjectCardResponse {
	private Long id;
	private String title;
	private String content;
	private String image;
	private UserResponse user;

	public static MyProjectCardResponse toDTO(MyProjectCard myProjectCard) {
		return MyProjectCardResponse.builder().id(myProjectCard.getId()).title(myProjectCard.getTitle())
				.content(myProjectCard.getContent()).image(myProjectCard.getImage())
				.user(UserResponse.toDTO(myProjectCard.getUser())).build();
	}
}
