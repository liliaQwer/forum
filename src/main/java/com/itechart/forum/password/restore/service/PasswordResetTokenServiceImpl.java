package com.itechart.forum.password.restore.service;

import com.itechart.forum.password.restore.repository.PasswordRestoreTokenRepository;
import com.itechart.forum.password.restore.entity.PasswordRestoreToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PasswordResetTokenServiceImpl implements PasswordResetTokenService {
    @Autowired
    PasswordRestoreTokenRepository passwordRestoreTokenRepository;

    @Override
    public void save(PasswordRestoreToken passwordRestoreToken) {
        passwordRestoreTokenRepository.save(passwordRestoreToken);
    }

    @Override
    public void delete(PasswordRestoreToken passwordRestoreToken) {
        passwordRestoreTokenRepository.delete(passwordRestoreToken);
    }

    public PasswordRestoreToken findByToken(String token){
        return passwordRestoreTokenRepository.findByToken(token);
    }
}
