package com.itechart.forum.comment.controller;

import com.itechart.forum.comment.dto.CommentAddDto;
import com.itechart.forum.comment.dto.CommentInfoDto;
import com.itechart.forum.comment.service.CommentService;
import com.itechart.forum.common.exception.ResourceNotFoundException;
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
import org.springframework.web.bind.annotation.*;

import javax.naming.NoPermissionException;
import javax.validation.Valid;

@RestController
public class CommentController {
    @Autowired
    CommentService commentService;

    @Autowired
    ModelMapper modelMapper;

    @PostMapping(path = "/posts/{postId}/comments/{commentId}/like")
    public ResponseEntity<?> like(@PathVariable Integer postId, @PathVariable Integer commentId) throws ResourceNotFoundException {
        commentService.addLike(commentId);
        return ResponseEntity.ok().build();
    }

    @PostMapping(path = "/posts/{postId}/comments/{commentId}/dislike")
    public ResponseEntity<?> dislike(@PathVariable Integer postId, @PathVariable Integer commentId) throws ResourceNotFoundException {
        commentService.addDislike(commentId);
        return ResponseEntity.ok().build();
    }

    @PostMapping(path = "/posts/{postId}/comments")
    public ResponseEntity<Integer> addComment(@Valid @RequestBody CommentAddDto commentAddDto) {
        int id = commentService.save(commentAddDto);
        return ResponseEntity.ok().body(id);
    }

    @DeleteMapping(path = "/posts/{postId}/comments")
    public ResponseEntity<?> deleteComment(Authentication authentication, @PathVariable Integer postId, @RequestBody int id) throws NoPermissionException, ResourceNotFoundException {
        UserDetails userDetails = (UserDetailsImpl) authentication.getPrincipal();
        commentService.delete(userDetails, id);
        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/posts/{postId}/comments")
    public Page<CommentInfoDto> getComments(@PathVariable Integer postId,
                                            @PageableDefault(size = 5, sort = "createdBy", direction = Sort.Direction.DESC)Pageable pageable){
        return commentService.get(postId, pageable);
    }
}
