package com.itechart.forum.user.service;

import com.itechart.forum.user.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    int save(User user);
    void update(User user);
    int delete(int id);
    Optional<User> get(int id);
    List<User> getAll();
    User findByLogin(String login);
    User findByEmail(String email);
    void updatePassword(String password, Integer userId);
}
