package com.itechart.forum.user.service;

import com.itechart.forum.common.exception.AlreadyExistException;
import com.itechart.forum.user.dto.UserAddDto;
import com.itechart.forum.user.dto.UserFullInfoDto;
import com.itechart.forum.user.entity.User;
import com.itechart.forum.user.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelMapper modelMapper;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public int save(UserAddDto userAddDto) throws AlreadyExistException {
        validateExist(userAddDto);
        User user = new User();
        user.setLogin(userAddDto.login());
        user.setEmail(userAddDto.email());
        user.setPassword(passwordEncoder.encode(userAddDto.password()));
        user.setRole(userAddDto.role());
        user.setProvider(userAddDto.provider());
        User savedUser = userRepository.save(user);
        return savedUser.getId();
    }

    @Override
    public UserFullInfoDto get(Integer id) {
        if (!userRepository.existsById(id)){
           return null;
        }
        return modelMapper.map(userRepository.getOne(id), UserFullInfoDto.class);
    }

    @Override
    public UserFullInfoDto saveAndFetch(UserAddDto userAddDto) throws AlreadyExistException {
        validateExist(userAddDto);
        User user = new User();
        user.setLogin(userAddDto.login());
        user.setEmail(userAddDto.email());
        user.setPassword(passwordEncoder.encode(userAddDto.password()));
        user.setRole(userAddDto.role());
        user.setProvider(userAddDto.provider());
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserFullInfoDto.class);
    }

    @Override
    public UserFullInfoDto findByLogin(String login)  {
        User user = userRepository.findByLoginIgnoreCase(login);
        if (user == null){
            return null;
        }
        return modelMapper.map(user, UserFullInfoDto.class);
    }

    @Override
    public UserFullInfoDto findByEmail(String email) {
        User user = userRepository.findByEmailIgnoreCase(email);
        if (user == null){
           return null;
        }
        return  modelMapper.map(user, UserFullInfoDto.class);
    }

    @Override
    public void updatePassword(String password, Integer userId) {
        userRepository.updatePassword(password, userId);
    }

    private void validateExist(UserAddDto userAddDto) throws AlreadyExistException {
        if (userRepository.existsByEmailIgnoreCase(userAddDto.email())){
            throw new AlreadyExistException("User already exists with the same email " + userAddDto.email());
        }
        if (userRepository.existsByLogin(userAddDto.login())){
            throw new AlreadyExistException("User already exists with the same login " + userAddDto.login());
        }
    }
}
