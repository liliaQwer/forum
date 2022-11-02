package com.itechart.forum.security.userdetails;

import com.itechart.forum.user.dto.UserFullInfoDto;
import com.itechart.forum.user.type.RoleType;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.time.Instant;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class UserDetailsImpl extends UserFullInfoDto implements UserDetails, OAuth2User {

    private Map<String, Object> attributes;

    private Instant tokenExpireAt;

    public UserDetailsImpl(UserFullInfoDto user) {
        super(user);
    }

    public UserDetailsImpl(UserFullInfoDto user, Map<String, Object> attributes) {
        super(user);
        this.attributes = attributes;
    }

    public UserDetailsImpl(UserFullInfoDto user, Map<String, Object> attributes, Instant tokenExpireAt) {
        super(user);
        this.attributes = attributes;
        this.tokenExpireAt = tokenExpireAt;
    }
    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }
    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
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

    @Override
    public String toString(){
        return getUsername();
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    public Instant getTokenExpireAt() {
        return tokenExpireAt;
    }

    public void setTokenExpireAt(Instant tokenExpireAt) {
        this.tokenExpireAt = tokenExpireAt;
    }
}
