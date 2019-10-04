package com.itechart.forum.common.scheduler;

import com.itechart.forum.user.restore.service.PasswordResetTokenServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class Scheduler {
    @Autowired
    PasswordResetTokenServiceImpl passwordResetTokenService;

    @Scheduled(cron = "0 0 9 1 * ?")
    public void deleteExpiredTokens(){
        passwordResetTokenService.deleteExpired();
    }
}
