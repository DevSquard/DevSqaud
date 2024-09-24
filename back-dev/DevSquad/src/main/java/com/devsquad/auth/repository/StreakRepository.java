package com.devsquad.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsquad.auth.entity.Streak;

@Repository
public interface StreakRepository extends JpaRepository<Streak, Long> {

}
