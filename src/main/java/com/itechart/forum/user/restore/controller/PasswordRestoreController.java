package com.itechart.forum.user.restore.controller;

import com.itechart.forum.common.exception.ResourceNotFoundException;
import com.itechart.forum.user.dto.UserFullInfoDto;
import com.itechart.forum.user.restore.dto.EmailToRestoreDto;
import com.itechart.forum.user.restore.dto.PasswordResetDto;
import com.itechart.forum.user.restore.exception.PasswordRestoreException;
import com.itechart.forum.user.restore.service.EmailService;
import com.itechart.forum.user.restore.service.PasswordResetTokenService;
import com.itechart.forum.user.restore.entity.PasswordRestoreToken;
import com.itechart.forum.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;

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
    public ResponseEntity<String> sendMailForRestore(@Valid @RequestBody EmailToRestoreDto emailToRestoreDto) throws ResourceNotFoundException {
        UserFullInfoDto user = userService.findByEmail(emailToRestoreDto.getEmail());
        if (user == null) {
            throw new ResourceNotFoundException("User not found for this email : " + emailToRestoreDto.getEmail());
        }

        PasswordRestoreToken passwordRestoreToken = passwordResetTokenService.generate(user.getId());
        passwordResetTokenService.save(passwordRestoreToken);

        emailService.sendEmail(emailToRestoreDto.getEmail(), passwordRestoreToken.getToken());
        return ResponseEntity.ok().body("Check you mail");
    }

    @GetMapping
    public ResponseEntity<String> displayResetPasswordPage(@RequestParam String token) throws Exception {

        PasswordRestoreToken resetToken = passwordResetTokenService.findByToken(token);
        verifyToken(resetToken);
        return ResponseEntity.ok().body(resetToken.getToken());
    }

    @PutMapping
    @Transactional
    public ResponseEntity<String> handlePasswordReset(@RequestBody @Valid PasswordResetDto form) throws PasswordRestoreException{

        PasswordRestoreToken token = passwordResetTokenService.findByToken(form.getToken());
        verifyToken(token);
        String updatedPassword = passwordEncoder.encode(form.getPassword());
        userService.updatePassword(updatedPassword, token.getUserId());
        passwordResetTokenService.delete(token);

        return ResponseEntity.ok().build();
    }

    private void verifyToken(PasswordRestoreToken token) throws PasswordRestoreException{
        if (token == null) {
            throw new PasswordRestoreException("Could not find password reset token.");
        } else if (token.isExpired()) {
            throw new PasswordRestoreException("Token has expired, please request a new link.");
        }
    }
}
