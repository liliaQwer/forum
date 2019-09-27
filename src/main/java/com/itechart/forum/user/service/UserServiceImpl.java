package com.itechart.forum.user.service;

import com.itechart.forum.user.entity.User;
import com.itechart.forum.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    @Override
    public int save(User user) {
        User newUser = userRepository.save(user);
        return newUser.getId();
    }

    @Override
    public void update(User user) {

    }

    @Override
    public int delete(int id) {
        return 0;
    }

    @Override
    public Optional<User> get(int id) {
        return userRepository.findById(1);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User findByLogin(String login) {
        User user = userRepository.findByLogin(login);
        return user;
    }

    @Override
    public User findByEmail(String email) {
        User user = userRepository.findByEmailIgnoreCase(email);
        return user;
    }

    @Override
    public void updatePassword(String password, Integer userId) {
        userRepository.updatePassword(password, userId);
    }
}
