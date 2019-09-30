package com.itechart.forum.user.service;

import com.itechart.forum.user.dto.UserAddDto;
import com.itechart.forum.user.dto.UserInfoDto;

public interface UserService {
    int save(UserAddDto userAddDto);
    UserInfoDto get(Integer id);
    UserInfoDto findByLogin(String login);
    UserInfoDto findByEmail(String email);
    void updatePassword(String password, Integer userId);
}
