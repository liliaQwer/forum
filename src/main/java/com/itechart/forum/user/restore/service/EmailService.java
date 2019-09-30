package com.itechart.forum.user.restore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;

@Service
public class EmailService  {

    private static final String SUBJECT = "Password reset request";
    private static final String FROM = "{spring.mail.username}";
    private static final String URL = "http://localhost:8080/restore?token=";
    private static final String INIT_MAIL_TEXT = "In order to change your password please access this link ";

    @Autowired
    private JavaMailSender emailSender;

    public void sendEmail(String email, String token) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());


            helper.setTo(email);
            helper.setText(getText(token), true);
            helper.setSubject(SUBJECT);
            helper.setFrom(FROM);

            emailSender.send(message);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    private String getText(String token){
        StringBuilder sb = new StringBuilder(INIT_MAIL_TEXT);
        return  sb.append(URL)
                .append(token).toString();
    }
}
