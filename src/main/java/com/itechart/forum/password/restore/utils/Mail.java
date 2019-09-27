package com.itechart.forum.password.restore.utils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Mail {
    private static final String URL = "http://localhost:8080/restore?token=";
    private String from;
    private String to;
    private String subject;
    private String passwordResetToken;

    public String getText(){
        StringBuilder sb = new StringBuilder("In order to change your password please access this link ");
        return  sb.append(URL)
                .append(passwordResetToken).toString();
    }
}
