package com.itechart.forum.password.restore.repository;

import com.itechart.forum.password.restore.entity.PasswordRestoreToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PasswordRestoreTokenRepository extends JpaRepository<PasswordRestoreToken, Integer> {
    PasswordRestoreToken findByToken(String token);
}
