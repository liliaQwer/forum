package com.itechart.forum.security.userdetails;

import com.itechart.forum.common.exception.AlreadyExistException;
import com.itechart.forum.common.exception.OAuth2AuthenticationProcessingException;
import com.itechart.forum.security.oauth2.CookieUtils;
import com.itechart.forum.user.dto.UserAddDto;
import com.itechart.forum.user.dto.UserFullInfoDto;
import com.itechart.forum.user.service.UserService;
import com.itechart.forum.user.type.AuthProvider;
import com.itechart.forum.user.type.RoleType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserService userService;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User =  super.loadUser(userRequest);
        try {
            return processOAuth2User(userRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) throws AlreadyExistException {
        CustomOAuth2User oAuth2UserInfo = new CustomOAuth2User(oAuth2User);
        if(StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        UserFullInfoDto user = userService.findByEmail(oAuth2UserInfo.getEmail());
        if (user != null) {
            if(!user.getProvider().equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return new UserDetailsImpl(user, oAuth2User.getAttributes(), oAuth2UserRequest.getAccessToken().getExpiresAt());
    }

    private UserFullInfoDto registerNewUser(OAuth2UserRequest oAuth2UserRequest, CustomOAuth2User oAuth2UserInfo) throws AlreadyExistException {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                oAuth2UserInfo, null, oAuth2UserInfo.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        UserAddDto user = new UserAddDto(oAuth2UserInfo.getName(),oAuth2UserInfo.getEmail(),"*", RoleType.USER, AuthProvider.facebook);
        userService.save(user);
        return userService.findByEmail(oAuth2UserInfo.getEmail());
    }

}
