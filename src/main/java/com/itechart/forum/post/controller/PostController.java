package com.itechart.forum.post.controller;

import com.itechart.forum.common.exception.ResourceNotFoundException;
import com.itechart.forum.post.dto.*;
import com.itechart.forum.post.service.PostService;
import com.itechart.forum.post.type.CategoryType;
import com.itechart.forum.post.type.CategoryTypeConverter;
import com.itechart.forum.security.userdetails.UserDetailsImpl;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.naming.NoPermissionException;
import javax.validation.Valid;

@RestController
@RequestMapping(path = "/posts")
public class PostController {

    @Autowired
    PostService postService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping
    public Page<PostInfoDto> getPostList (@PageableDefault(sort = {"createdDate"}, direction = Sort.Direction.DESC) Pageable pageable,
                                          @Valid PostFilterDto filter) {

        return postService.get(filter, pageable);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<PostFullInfoDto> getFullPostById(@PathVariable int id) throws ResourceNotFoundException {
        PostFullInfoDto post = postService.getFullInfoById(id);
        return ResponseEntity.ok().body(post);
    }

    @PostMapping
    public ResponseEntity<Integer> addPost(@Valid @RequestBody PostAddDto postAddDto){
        int id = postService.save(postAddDto);
        return ResponseEntity.ok().body(id) ;
    }

    @DeleteMapping
    public ResponseEntity<?> deletePost(Authentication authentication, @RequestBody int... ids) throws NoPermissionException, ResourceNotFoundException {
        UserDetails userDetails = (UserDetailsImpl) authentication.getPrincipal();
        postService.delete(userDetails, ids);
        return ResponseEntity.ok().build();
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<PostInfoDto> editPost(Authentication authentication, @PathVariable int id, @Valid @RequestBody PostUpdateDto postAddDto)
            throws NoPermissionException, ResourceNotFoundException {
        UserDetails userDetails = (UserDetailsImpl) authentication.getPrincipal();
        postService.update(userDetails, id, postAddDto);
        return ResponseEntity.ok().build();
    }

//    @InitBinder
//    public void initBinder(final WebDataBinder webdataBinder) {
//        webdataBinder.registerCustomEditor(CategoryType.class, new CategoryTypeConverter());
//    }
}
