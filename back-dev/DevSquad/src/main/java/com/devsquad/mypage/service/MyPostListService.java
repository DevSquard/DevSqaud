package com.devsquad.mypage.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.devsquad.auth.entity.User;
import com.devsquad.auth.repository.UserRepository;
import com.devsquad.community.domain.PostResponse;
import com.devsquad.community.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MyPostListService {
	private final PostRepository postRepository;
	private final UserRepository userRepository;

	// 내가 작성한 글 목록
	public List<PostResponse> getPostsByUserId(Long userId) {
		User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다"));

		List<PostResponse> myPostList = postRepository.findByUser(user).stream().map(PostResponse::toDTO).toList();

		return myPostList;
	}
}
