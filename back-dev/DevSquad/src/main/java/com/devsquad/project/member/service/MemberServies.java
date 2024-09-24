package com.devsquad.project.member.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.devsquad.auth.entity.User;
import com.devsquad.project.member.domain.MemberRequest;
import com.devsquad.project.member.domain.MemberResponse;
import com.devsquad.project.member.entity.Member;
import com.devsquad.project.member.repository.MemberRepository;
import com.devsquad.project.project.entity.Project;
import com.devsquad.project.project.repository.ProjectRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServies {
	private final MemberRepository memberRepository;
	private final ProjectRepository projectRepository;
	
	public MemberResponse addProjectMember(MemberRequest pro, User user) {
		//Member 타입으로 프로젝트 멤버 저장
		Member savedProjectMember = memberRepository.save(pro.toEntity());
		//MemberResponse로 타입 변환
		MemberResponse projectResponse = MemberResponse.toDTO(savedProjectMember);
		//반환
		return projectResponse;
	}

	public MemberResponse deleteProjectMember(Long id) {
		//id를 통해 멤버를 찾고
		Member dpro = memberRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("없음"));
		//찾은 멤버 삭제
		memberRepository.deleteById(dpro.getId());
		return null;
	}

	public List<MemberResponse> getAllMember() {
		//List로 모든 프로젝트 조회
		List<Member> proList = memberRepository.findAll();
		//타입 변환
		List<MemberResponse> pLi = proList.stream().map(MemberResponse::toDTO).toList();
		//반환
		return pLi;
	}

	public MemberResponse joinProject(Long proId, Long memId) {
		//id를 통해 프로젝트를 찾고,
		Project pro = projectRepository.findById(proId).orElseThrow(() -> new IllegalArgumentException("없음"));
		//id를 통해 멤버를 특정하고
		Member proM = memberRepository.findById(memId).orElseThrow(() -> new IllegalArgumentException("없음"));
		//특정한 멤버의 프로젝트에 선택한 프로젝트 추가
		proM.setProject(pro);
		//타입 변환 후 반환
		return MemberResponse.toDTO( memberRepository.save(proM));
	}

}
