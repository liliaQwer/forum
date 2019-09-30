package com.itechart.forum.user.service;

import com.itechart.forum.user.dto.UserAddDto;
import com.itechart.forum.user.dto.UserInfoDto;
import com.itechart.forum.user.entity.User;
import com.itechart.forum.user.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public int save(UserAddDto userAddDto) {
        User user = userRepository.save(modelMapper.map(userAddDto, User.class));
        return user.getId();
    }

    @Override
    public UserInfoDto get(Integer id) {
        return modelMapper.map(userRepository.getOne(1), UserInfoDto.class);
    }

    @Override
    public UserInfoDto findByLogin(String login) {
        User user = userRepository.findByLogin(login);
        return modelMapper.map(user, UserInfoDto.class);
    }

    @Override
    public UserInfoDto findByEmail(String email) {
        User user = userRepository.findByEmailIgnoreCase(email);
        return  modelMapper.map(user, UserInfoDto.class);
    }

    @Override
    public void updatePassword(String password, Integer userId) {
        userRepository.updatePassword(password, userId);
    }
}
