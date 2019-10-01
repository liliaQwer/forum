package com.itechart.forum.user.service;

import com.itechart.forum.common.exception.AlreadyExistException;
import com.itechart.forum.user.dto.UserAddDto;
import com.itechart.forum.user.dto.UserFullInfoDto;

import javax.transaction.Transactional;

public interface UserService {
    @Transactional
    int save(UserAddDto userAddDto) throws AlreadyExistException;

    @Transactional
    UserFullInfoDto saveAndFetch(UserAddDto userAddDto) throws AlreadyExistException ;

    @Transactional
    UserFullInfoDto get(Integer id);

    @Transactional
    UserFullInfoDto findByLogin(String login);

    @Transactional
    UserFullInfoDto findByEmail(String email);

    @Transactional
    void updatePassword(String password, Integer userId);
}
