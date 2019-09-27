package com.itechart.forum.password.restore.service;

import com.itechart.forum.password.restore.entity.PasswordRestoreToken;

import javax.transaction.Transactional;

public interface PasswordResetTokenService {
    @Transactional
    void save(PasswordRestoreToken passwordRestoreToken);
    @Transactional
    void delete(PasswordRestoreToken passwordRestoreToken);
    PasswordRestoreToken findByToken(String token);
}
