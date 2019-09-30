package com.itechart.forum.user.restore.service;

import com.itechart.forum.user.restore.entity.PasswordRestoreToken;

import javax.transaction.Transactional;

public interface PasswordResetTokenService {
    @Transactional
    void save(PasswordRestoreToken passwordRestoreToken);
    @Transactional
    void delete(PasswordRestoreToken passwordRestoreToken);
    PasswordRestoreToken findByToken(String token);
    PasswordRestoreToken generate(Integer userId);

}
