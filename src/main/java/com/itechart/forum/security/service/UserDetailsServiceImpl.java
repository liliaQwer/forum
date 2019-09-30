package com.itechart.forum.security.service;

import com.itechart.forum.user.dto.UserInfoDto;
import com.itechart.forum.user.entity.User;
import com.itechart.forum.user.exception.UserNotFoundException;
import com.itechart.forum.user.service.UserService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashSet;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {
    private UserService userService;

    @Autowired
    public UserDetailsServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserInfoDto user = userService.findByLogin(username);
        if (user == null) {
            throw new UserNotFoundException("User with login '%s' doesn't exist", username);
        }
        return new UserDetailsImpl(user);
    }

    @Getter
    @Setter
    public class UserDetailsImpl extends UserInfoDto implements UserDetails {
        public UserDetailsImpl(UserInfoDto user) {
            super(user);
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return new HashSet<GrantedAuthority>() ;
        }

        @Override
        public String getUsername() {
            return getLogin();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
