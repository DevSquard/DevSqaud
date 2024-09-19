package com.devsquad.auth.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;

import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.devsquad.auth.domain.RoleEnum;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_tbl")
@EntityListeners(AuditingEntityListener.class) // 생성, 수정 날짜 추적 -> Application.java (@EnableJpaAuditing)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {
	private static final long serialVersionUID = 1L; // serialVersionUID 추가
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(updatable = false)
	private Long id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String nickName;
	
	@Column(nullable = false, unique = true)
	private String email;
	
	@Column(nullable = true)
	private String password;
	
	@Column
	@Builder.Default
	private boolean oAuth = false;
	
	@Column(nullable = false)
	private LocalDate birth;
	
	@CreatedDate
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	@LastModifiedDate
	@Column(name = "updated_at")
	private LocalDateTime updatedAt;
	
	@Column(name = "deleted_at", nullable = true)
	private LocalDateTime deletedAt;
	
	@Column(name = "failed_count")
	@Builder.Default
	private int failedCount = 0;
	
	@Column(name = "logined_at")
	private LocalDateTime loginedAt;
	
	@Column(name = "is_blocked")
	@Builder.Default
	private boolean isBlock = false;
	
	@Column(name = "blocked_at")
	private LocalDateTime blockedAt;
	
	@Column
	private String language;
	
	@Column(name = "hot_level", nullable = false)
	@Builder.Default
	private int hotLevel = 37;
	
	@Column
	private String intro;

	@Column(name = "streak_count", nullable = false)
	@Builder.Default
	private int streakCount = 0;
	
	@ElementCollection
	@CollectionTable(name = "user_streaks", joinColumns = @JoinColumn(name = "user_id"))
	@Column(name = "streak_date")
	private Set<LocalDate> streakDates = new HashSet<>();

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	@Builder.Default
	private RoleEnum role = RoleEnum.ROLE_USER; // 기본으로 USER 부여
	
	@Column(name="refresh_token", nullable = true)
	private String refreshToken;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// 권한 목록 반환
		return List.of(new SimpleGrantedAuthority(role.name()));
	}

	// 유저의 email 유니크 키로 사용
	@Override
	public String getUsername() {
		return email;
	}
}
