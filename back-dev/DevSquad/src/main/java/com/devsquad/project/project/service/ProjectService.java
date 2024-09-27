package com.devsquad.project.project.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.devsquad.auth.entity.User;
import com.devsquad.auth.repository.UserRepository;
import com.devsquad.project.project.domain.ProjectRequest;
import com.devsquad.project.project.domain.ProjectResponse;
import com.devsquad.project.project.entity.Project;
import com.devsquad.project.project.repository.ProjectRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public List<ProjectResponse> getAllProject() {
    	//모든 프로젝트 가져오고
        List<Project> proList = projectRepository.findAll();
        //빈 배열 하나 만들어주고
        List<Project> pList =  new ArrayList<Project>();
        //Project 타입의 변수 p로 전체 목록을 하나씩 뽑아서
        for(Project p : proList) {    
        	//모집 종료 날짜가 지나지 않았거나, 모집 시작 날짜가 지났으면 새로운 배열에 추가
        	if(!p.getEndedAt().isBefore(LocalDate.now()) && p.getStartedAt().isBefore(LocalDate.now()) ) {
        		pList.add(p);
        	}
        }
        //새롭게 추가된 배열 반환
        return pList.stream().map(ProjectResponse::toDTO).toList();
    }
    
    public ProjectResponse addProject(ProjectRequest pro, User user) {
    	// request에 담긴 userId로 유저 가져오기
    	
    	// Request를 Project 타입으로 변환
    	Project project = Project.builder()
    		.id(pro.getId())
    		.user(user)
    		.projectName(pro.getProjectName())
    		.simpleIntro(pro.getSimpleIntro())
    		.description(pro.getDescription())
    		.devStack(pro.getDevStack())
    		.participaint(pro.getParticipaint())
    		.endedAt(pro.getEndedAt())
    		.startedAt(pro.getStartedAt())
    		.build();
    	//DB에 프로젝트 저장
        Project savedPro = projectRepository.save(project);
        log.info("저장된 프로젝트 : {}", savedPro);
        //타입 변환 후 반환
        return ProjectResponse.toDTO(savedPro);
    }

    public ProjectResponse getProject(Long id) {
    	//id를 통해 프로젝트를 찾고
        Project pro = projectRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("없음"));
        //타입 변환 후 반환
        return ProjectResponse.toDTO(pro);
    }

    public ProjectResponse deleteProject(Long id,User user) {
    	//id 를 통해 프로젝트를 찾고
        Project pro = projectRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("없음"));
        if(user.getId() == pro.getUser().getId()) {
        	//그 프로젝트 삭제
        	projectRepository.deleteById(pro.getId());
        }
        
        return null;
    }

    public ProjectResponse updateProject(ProjectRequest pro, User user) {
    	//id를 통해 프로젝트를 찾고
        Project project = projectRepository.findById(pro.getId()).orElseThrow(() -> new IllegalArgumentException("없음"));
        //로그인 한 사용자가 작성자와 같고, 수정할 값이 null이 아니라면 입력한 값으로 수정
        if(user.getId() == pro.getUserId()) {
        	if(pro.getDescription() != null) project.setDescription(pro.getDescription());
            if(pro.getSimpleIntro() != null) project.setSimpleIntro(pro.getSimpleIntro());
            if(pro.getProjectName() != null) project.setProjectName(pro.getProjectName());
          //프로젝트 수정 후 저장
            Project updatedProject = projectRepository.save(project);
            //타입 변환 후 반환
            return ProjectResponse.toDTO(updatedProject);
        }
        return null;
        
    }
}
