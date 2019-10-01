package com.itechart.forum.security.userdetails;

import com.itechart.forum.common.exception.ResourceNotFoundException;
import com.itechart.forum.user.dto.UserFullInfoDto;
import com.itechart.forum.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {
    private UserService userService;

    @Autowired
    public UserDetailsServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserFullInfoDto user = userService.findByLogin(username);
        if (user == null){
            throw new UsernameNotFoundException("No user found with this login " + username);
        }
        return new UserDetailsImpl(user);
    }
}

