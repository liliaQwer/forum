package com.itechart.forum.user.controller;

import com.itechart.forum.common.exception.AlreadyExistException;
import com.itechart.forum.common.exception.ResourceNotFoundException;
import com.itechart.forum.security.jwt.JwtTokenUtil;
import com.itechart.forum.user.dto.LoginDto;
import com.itechart.forum.user.dto.UserAddDto;
import com.itechart.forum.user.dto.UserFullInfoDto;
import com.itechart.forum.user.entity.User;
import com.itechart.forum.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping(path = "/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody UserAddDto userAddDto) throws AlreadyExistException {
        userAddDto.setPassword(passwordEncoder.encode(userAddDto.getPassword()));
        userService.saveAndFetch(userAddDto);
        String token = jwtTokenUtil.generateToken(userAddDto.getLogin(), userAddDto.getRole().name());
        return ResponseEntity.ok(token);
    }

    @PostMapping(path = "/signin")
    public ResponseEntity<?> signIn(@Valid @RequestBody LoginDto loginDto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getLogin(),
                loginDto.getPassword()));
        UserFullInfoDto user = userService.findByLogin(loginDto.getLogin());
        String token = jwtTokenUtil.generateToken(loginDto.getLogin(), user.getRole().name());
        return ResponseEntity.ok(token);
    }
}
