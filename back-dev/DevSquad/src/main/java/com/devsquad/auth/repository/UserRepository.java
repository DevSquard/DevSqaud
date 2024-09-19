package com.devsquad.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsquad.auth.entity.User;
import com.devsquad.project.project.entity.Project;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	// 삭제되지 않은 유저 중 Eamil로 조회
	Optional<User> findByEmailAndDeletedAtIsNull(String email);
	// 삭제되지 않은 유저들의 Email 중 중복이 있는지
	boolean existsByEmailAndDeletedAtIsNull(String email);
	// 삭제되지 않은 유저 중 Id로 조회
	Optional<User> findByIdAndDeletedAtIsNull(Long userId);

}
