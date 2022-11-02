package com.itechart.forum.user.controller;

import com.itechart.forum.common.exception.AlreadyExistException;
import com.itechart.forum.security.jwt.JwtTokenUtil;
import com.itechart.forum.user.dto.LoginDto;
import com.itechart.forum.user.dto.UserAddDto;
import com.itechart.forum.user.dto.UserFullInfoDto;
import com.itechart.forum.user.service.UserService;
import com.itechart.forum.user.type.RoleType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserService userService;



    @PostMapping(path = "/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody UserAddDto userAddDto) throws AlreadyExistException {
        userService.saveAndFetch(new UserAddDto(userAddDto.login(), userAddDto.email(), userAddDto.password()));
        String token = jwtTokenUtil.generateToken(userAddDto.login(), RoleType.USER.name());
        return ResponseEntity.ok(token);
    }

    @PostMapping(path = "/signin")
    public ResponseEntity<?> signIn(@Valid @RequestBody LoginDto loginDto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.login(),
                loginDto.password()));
        UserFullInfoDto user = userService.findByLogin(loginDto.login());
        String token = jwtTokenUtil.generateToken(loginDto.login(), user.getRole().name());
        return ResponseEntity.ok(token);
    }
}
