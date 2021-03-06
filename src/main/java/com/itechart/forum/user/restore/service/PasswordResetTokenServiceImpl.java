package com.itechart.forum.user.restore.service;

import com.itechart.forum.user.restore.repository.PasswordRestoreTokenRepository;
import com.itechart.forum.user.restore.entity.PasswordRestoreToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
public class PasswordResetTokenServiceImpl implements PasswordResetTokenService {
    @Value("${password.restore.expire.days}")
    private Integer expireDays;

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

    @Override
    public PasswordRestoreToken generate(Integer userId) {
        PasswordRestoreToken passwordRestoreToken = new PasswordRestoreToken();
        passwordRestoreToken.setToken(UUID.randomUUID().toString());
        passwordRestoreToken.setUserId(userId);
        passwordRestoreToken.setExpireDate(LocalDate.now().plusDays(expireDays));
        return passwordRestoreToken;
    }

    @Override
    public void deleteExpired(){
        //delete all records with expire_date more than month ago
        passwordRestoreTokenRepository.deleteAllByExpireDateBefore(LocalDate.now().minusMonths(1));
    }
}
