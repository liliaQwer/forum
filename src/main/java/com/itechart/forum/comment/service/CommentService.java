package com.itechart.forum.comment.service;

import com.itechart.forum.comment.dto.CommentAddDto;
import com.itechart.forum.comment.dto.CommentInfoDto;
import com.itechart.forum.common.exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.NoPermissionException;


public interface CommentService {
    @Transactional
    int save (CommentAddDto commentAddDto);

    @Transactional
    void delete (UserDetails userDetails, Integer id) throws NoPermissionException, ResourceNotFoundException;

    @Transactional
    Page<CommentInfoDto> get (int postId, Pageable pageable);

    @Transactional
    void addLike (Integer id) throws ResourceNotFoundException;

    @Transactional
    void addDislike (Integer id) throws ResourceNotFoundException;

}
