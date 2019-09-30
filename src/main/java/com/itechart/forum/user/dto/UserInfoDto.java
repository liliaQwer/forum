package com.itechart.forum.user.dto;

import com.itechart.forum.user.type.RoleType;
import lombok.Data;

@Data
public class UserInfoDto {

    public UserInfoDto(UserInfoDto user){
        this.id = user.id;
        this.login = user.login;
        this.password = user.password;
        this.email = user.email;
        this.role = user.role;
    }
    private Integer id;

    private String login;

    private String email;

    private String password;

    private RoleType role;
}
