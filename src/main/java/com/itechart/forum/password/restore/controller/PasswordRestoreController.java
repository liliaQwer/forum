package com.itechart.forum.password.restore.controller;

import com.itechart.forum.common.exception.ResourceNotFoundException;
import com.itechart.forum.password.restore.utils.Mail;
import com.itechart.forum.password.restore.dto.EmailToRestoreDto;
import com.itechart.forum.password.restore.dto.PasswordResetDto;
import com.itechart.forum.password.restore.service.EmailService;
import com.itechart.forum.password.restore.service.PasswordResetTokenService;
import com.itechart.forum.password.restore.entity.PasswordRestoreToken;
import com.itechart.forum.user.entity.User;
import com.itechart.forum.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.time.LocalDate;
import java.util.UUID;

@RestController
@RequestMapping(path = "/restore")
public class PasswordRestoreController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordResetTokenService passwordResetTokenService;

    @Autowired
    private EmailService emailService;

    @Autowired
    public PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<String> sendMailForRestore(@Valid @RequestBody EmailToRestoreDto emailToRestoreDto) throws ResourceNotFoundException{
        User user = userService.findByEmail(emailToRestoreDto.getEmail());
        if (user == null){
            throw new ResourceNotFoundException("User not found for this email : " + emailToRestoreDto.getEmail());
        }

        PasswordRestoreToken passwordRestoreToken = new PasswordRestoreToken();
        passwordRestoreToken.setToken(UUID.randomUUID().toString());
        passwordRestoreToken.setUser(user);
        passwordRestoreToken.setExpireDate(LocalDate.now().plusDays(12));
        passwordResetTokenService.save(passwordRestoreToken);

        Mail mail = new Mail();
        mail.setFrom("{spring.mail.username}");
        mail.setTo(user.getEmail());
        mail.setSubject("Password reset request");
        mail.setPasswordResetToken(passwordRestoreToken.getToken());

        emailService.sendEmail(mail);
        return ResponseEntity.ok().body("Check you mail");
    }

    @GetMapping
    public ResponseEntity<String> displayResetPasswordPage(@RequestParam(required = false) String token) throws Exception{

        PasswordRestoreToken resetToken = passwordResetTokenService.findByToken(token);
        if (resetToken == null){
            throw new Exception("Could not find password reset token.");
        } else if (resetToken.isExpired()){
            throw new Exception("Token has expired, please request a new password reset.");
        }
        return ResponseEntity.ok().body(resetToken.getToken());
    }

    @PutMapping
    @Transactional
    public ResponseEntity<String> handlePasswordReset(@RequestBody @Valid PasswordResetDto form) {

        PasswordRestoreToken token = passwordResetTokenService.findByToken(form.getToken());
        User user = token.getUser();
        String updatedPassword = passwordEncoder.encode(form.getPassword());
        userService.updatePassword(updatedPassword, user.getId());
        passwordResetTokenService.delete(token);

        return ResponseEntity.ok().build();
    }
}
