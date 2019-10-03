package com.itechart.forum.post.service;

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
    void update(int id, PostUpdateDto postUpdateDto);

    @Transactional
    void delete(int... ids) throws NoPermissionException;

    Page<PostInfoDto> get(PostFilterDto filter, Pageable pageable);

    PostInfoDto getById(Integer id) throws ResourceNotFoundException;

    PostFullInfoDto getFullInfoById(Integer id) throws ResourceNotFoundException;
}
