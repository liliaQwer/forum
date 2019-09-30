package com.itechart.forum.user.controller;

import com.itechart.forum.common.exception.ResourceNotFoundException;
import com.itechart.forum.user.dto.UserInfoDto;
import com.itechart.forum.user.entity.User;
import com.itechart.forum.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(path = "/{id}")
    public ResponseEntity<UserInfoDto> getUser(@PathVariable(value = "id") Integer userId) throws ResourceNotFoundException{
        System.out.println(new BCryptPasswordEncoder().encode("password"));

        UserInfoDto user = userService.get(userId);
        if (user == null){
           throw new ResourceNotFoundException("User not found for this id : " + userId);
        }
        return ResponseEntity.ok().body(user);
    }

    @GetMapping
    public ResponseEntity<User> getUser(@Valid User user){

        return ResponseEntity.ok().body(user);
    }

    @PostMapping
    public ResponseEntity<User> signUp(@Valid @RequestBody User user)  {//, BindingResult result

       // System.out.println(result);
        //ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        //Validator validator = factory.getValidator();
//        User user = new User();
//        user.setEmail("Liliaqwer@gmail.com");
//        user.setLogin("lilia1111111111111111111111111111111111111111111111111111111111");
//        user.setPassword(new BCryptPasswordEncoder().encode("password"));
//        user.setRole(RoleType.USER);
//        Set<ConstraintViolation<User>> violations = validator.validate(user);
//        for (ConstraintViolation<User> violation : violations) {
//            System.out.println(violation.getMessage());
//        }
        //userService.save(user);
       return ResponseEntity.ok().body(user);
    }


}
