package com.itechart.forum.user.dto;

import com.itechart.forum.user.type.AuthProvider;
import com.itechart.forum.user.type.RoleType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserFullInfoDto {

    public UserFullInfoDto(UserFullInfoDto user){
        this.id = user.id;
        this.login = user.login;
        this.password = user.password;
        this.email = user.email;
        this.role = user.role;
        this.provider = user.provider;
    }
    private Integer id;

    private String login;

    private String email;

    private String password;

    private RoleType role;

    private AuthProvider provider;
}
