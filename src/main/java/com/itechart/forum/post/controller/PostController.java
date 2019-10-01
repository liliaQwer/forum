package com.itechart.forum.post.controller;

import com.itechart.forum.post.dto.PostAddDto;
import com.itechart.forum.post.dto.PostInfoDto;
import com.itechart.forum.post.entity.Post;
import com.itechart.forum.post.service.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/posts")
public class PostController {

    @Autowired
    PostService postService;

    @Autowired
    ModelMapper modelMapper;

    @PostMapping
    public ResponseEntity<PostInfoDto> addPost(@Valid @RequestBody PostAddDto postAddDto)  {
        postService.save(postAddDto);
        return ResponseEntity.ok().body(modelMapper.map(postAddDto, PostInfoDto.class));
    }

}
