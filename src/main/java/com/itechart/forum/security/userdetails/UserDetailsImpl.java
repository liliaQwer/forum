package com.itechart.forum.security.userdetails;

import com.itechart.forum.user.dto.UserFullInfoDto;
import com.itechart.forum.user.type.RoleType;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
public class UserDetailsImpl extends UserFullInfoDto implements UserDetails {
    public UserDetailsImpl(UserFullInfoDto user) {
        super(user);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<RoleType> list = Arrays.asList(getRole());
        return Arrays.asList(getRole());
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
