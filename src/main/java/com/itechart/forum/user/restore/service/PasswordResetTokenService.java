package com.itechart.forum.user.restore.service;

import com.itechart.forum.user.restore.entity.PasswordRestoreToken;
import org.springframework.transaction.annotation.Transactional;

public interface PasswordResetTokenService {
    @Transactional
    void save(PasswordRestoreToken passwordRestoreToken);
    @Transactional
    void delete(PasswordRestoreToken passwordRestoreToken);
    @Transactional
    PasswordRestoreToken findByToken(String token);
    @Transactional
    PasswordRestoreToken generate(Integer userId);
    @Transactional
    void deleteExpired();

}
