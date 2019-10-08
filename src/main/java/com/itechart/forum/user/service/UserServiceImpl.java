package com.itechart.forum.user.service;

import com.itechart.forum.common.exception.AlreadyExistException;
import com.itechart.forum.user.dto.UserAddDto;
import com.itechart.forum.user.dto.UserFullInfoDto;
import com.itechart.forum.user.entity.User;
import com.itechart.forum.user.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public int save(UserAddDto userAddDto) throws AlreadyExistException {
        validateExist(userAddDto);
        User user = userRepository.save(modelMapper.map(userAddDto, User.class));
        return user.getId();
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
        User user = userRepository.save(modelMapper.map(userAddDto, User.class));
        return modelMapper.map(user, UserFullInfoDto.class);
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
        if (userRepository.existsByEmailIgnoreCase(userAddDto.getEmail())){
            throw new AlreadyExistException("User already exists with the same email " + userAddDto.getEmail());
        }
        if (userRepository.existsByLogin(userAddDto.getLogin())){
            throw new AlreadyExistException("User already exists with the same login " + userAddDto.getLogin());
        }
    }
}
