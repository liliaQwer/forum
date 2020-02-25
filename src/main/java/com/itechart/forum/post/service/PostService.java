package com.itechart.forum.post.service;

import com.itechart.forum.common.exception.OptimisticLockingException;
import com.itechart.forum.common.exception.ResourceNotFoundException;
import com.itechart.forum.post.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.NoPermissionException;

public interface PostService {
    @Transactional
    int save(PostAddDto postAddDto);

    @Transactional
    void update(UserDetails userDetails, int id, PostUpdateDto postUpdateDto) throws NoPermissionException, ResourceNotFoundException, OptimisticLockingException;

    @Transactional
    void delete(UserDetails userDetails, int... ids) throws NoPermissionException, ResourceNotFoundException;

    @Transactional
    Page<PostInfoDto> get(PostFilterDto filter, Pageable pageable);

    @Transactional
    PostInfoDto getById(Integer id) throws ResourceNotFoundException;
}
