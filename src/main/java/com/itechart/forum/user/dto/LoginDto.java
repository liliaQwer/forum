package com.itechart.forum.user.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
public class LoginDto {

    @NotNull(message = "{login.notnull}")
    @Size(max = 20, message = "{login.maxsize}")
    private String login;

    @NotNull(message = "{password.notnull}")
    @Size(max = 20, message = "{password.maxsize}")
    private String password;
}
