package com.itechart.forum.user.dto;

import com.itechart.forum.user.type.RoleType;

import lombok.Data;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class UserAddDto {
    @NotNull(message = "{login.notnull}")
    @Size(max = 20, message = "{login.maxsize}")
    private String login;

    @NotNull(message = "{email.notnull}")
    @Size(max = 50, message = "{email.maxsize}")
    @Email(message = "{email.incorrect}")
    private String email;

    @NotNull(message = "{password.notnull}")
    @Size(max = 20, message = "{password.maxsize}")
    private String password;

    @Enumerated(EnumType.ORDINAL)
    private RoleType role = RoleType.USER;
}
