package com.devsquad.project.member.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsquad.auth.entity.User;
import com.devsquad.project.member.domain.MemberRequest;
import com.devsquad.project.member.domain.MemberResponse;
import com.devsquad.project.member.service.MemberServies;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@Tag(name = "프로젝트 멤버", description = "프로젝트 멤버 관련 API")
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {
	private final MemberServies projectMemberService;
	
	//추가
	@Operation(summary = "프로젝트 멤버 추가", description = "프로젝트 멤버를 추가합니다.")
	@PostMapping("")
	public ResponseEntity<MemberResponse> addProjectMember(MemberRequest pro, User user){
		//멤버 서비스에게 멤버 추가 부탁
		MemberResponse savedProjectMember = projectMemberService.addProjectMember(pro, user);
		//생성됨을 반환, 반환된 객체는 저장된 멤버 정보 포함
		return ResponseEntity.status(HttpStatus.CREATED).body(savedProjectMember);
	}
	
	//삭제
	@Operation(summary = "프로젝트 멤버 삭제", description = "특정 프로젝트 멤버를 삭제합니다.")
	@DeleteMapping("/{id}")
	public ResponseEntity<MemberResponse> deleteProjectMember(@PathVariable("id") Long id,@AuthenticationPrincipal User user){
		//멤버 서비스에게 멤버 삭제 부탁
		MemberResponse dProjectMember = projectMemberService.deleteProjectMember(id, user);
		//삭제된 멤버 반환
		return ResponseEntity.ok(dProjectMember);
	}
	
	//멤버 리스트
	@Operation(summary = "프로젝트 멤버 조회", description = "프로젝트 멤버를 반환합니다.")
	@GetMapping("")
	public ResponseEntity<List<MemberResponse>> memberList(){
		//멤버 서비스에게 멤버리스트 조회 부탁
		List<MemberResponse> memList = projectMemberService.getAllMember();
		//멤버 리스트 반환
		return ResponseEntity.ok(memList);
	}
	
	//프로젝트 신청
	@Operation(summary = "프로젝트 신청", description = "프로젝트를 신청합니다.")
	@PostMapping("/{id}")
	public ResponseEntity<String> joinProject(@PathVariable("id") Long proId,@ AuthenticationPrincipal User user){
		//자신이 만든 프로젝트라면 신청 불가
		boolean check = projectMemberService.checkNotMyProject(user, proId);
		if (!check) {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("자신이 만든 프로젝트엔 참여 불가");
		}
		//멤버 서비스에게 프로젝트 신청 부탁 
		MemberResponse memJoin = projectMemberService.joinProject(proId, user);
		//프로젝트에 신청된 멤버 반환
		return ResponseEntity.ok("프로젝트 신청 완료");
	}
	
}
