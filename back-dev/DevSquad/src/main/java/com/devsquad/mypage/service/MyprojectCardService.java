package com.devsquad.mypage.service;

import org.springframework.stereotype.Service;

import com.devsquad.auth.entity.User;
import com.devsquad.auth.repository.UserRepository;
import com.devsquad.mypage.domain.request.MyProjectCardAddRequest;
import com.devsquad.mypage.domain.request.MyProjectCardDeleteRequest;
import com.devsquad.mypage.domain.request.MyProjectCardEditRequest;
import com.devsquad.mypage.domain.response.MyProjectCardResponse;
import com.devsquad.mypage.entity.MyProjectCard;
import com.devsquad.mypage.repository.MyprojectCardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MyprojectCardService {
	private final MyprojectCardRepository myprojectCardRepository;
	private final UserRepository userRepository;

	// 카드 생성하기
	public MyProjectCardResponse addProjectCard(MyProjectCardAddRequest projectCardDTO) {
		// 작성자 ID 로 엔티티 찿기
		User user = userRepository.findById(projectCardDTO.getUserId())
				.orElseThrow(() -> new IllegalArgumentException("없는 사용자 입니다"));
		// MyProjectCardAddRequest 객체를 엔티티로 변환
		MyProjectCard myProjectCard = projectCardDTO.toEntity(user);
		// MyProjectCard 엔티티를 DB 에 저장
		MyProjectCard saveProjectCard = myprojectCardRepository.save(myProjectCard);
		// 저장된 MyProjectCard 엔티티를 MyProjectCardResponse DTO 변환하고 반환
		MyProjectCardResponse result = MyProjectCardResponse.toDTO(saveProjectCard);

		return result;
	}

	// 카드 삭제하기
	public MyProjectCardResponse deleteProjectCard(Long id, MyProjectCardDeleteRequest projectCardDTO) {
		User user = userRepository.findById(projectCardDTO.getUserId())
				.orElseThrow(() -> new IllegalArgumentException("해당 유저를 찾을 수 없음"));

		MyProjectCard myProjectCard = myprojectCardRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("없는 게시물 입니다"));

		myprojectCardRepository.delete(myProjectCard);
		return MyProjectCardResponse.toDTO(myProjectCard);
	}

	// 카드 수정하기
	public MyProjectCardResponse editProjectCard(MyProjectCardEditRequest projectCardDTO) {

	}
}
