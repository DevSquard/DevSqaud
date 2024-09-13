package com.devsquad.mypage.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsquad.auth.entity.User;
import com.devsquad.mypage.domain.request.MyProfileCardRequest;
import com.devsquad.mypage.domain.response.MyProfileCardResponse;
import com.devsquad.mypage.repository.MyProfileCardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MyProfileCardService {
	private final MyProfileCardRepository myProfileCardRepository;


	@Transactional
	public MyProfileCardResponse getUserById(Long id) {
		User user = myProfileCardRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("회원 정보가 없습니다"));
		return MyProfileCardResponse.toDTO(user);
	}
	@Transactional
	public MyProfileCardResponse updateProfile(MyProfileCardRequest req) {
		User user = myProfileCardRepository.findById(req.getId())
				.orElseThrow(() -> new IllegalArgumentException("회원 정보가 없습니다"));

		user.setNickName(req.getNinkName());
		user.setLanguage(req.getLanguage());
		user.setIntro(req.getIntro());

		User updatedUser = myProfileCardRepository.save(user);
		return MyProfileCardResponse.toDTO(updatedUser);

	}
}
