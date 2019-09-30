package com.itechart.forum.post.service;

import com.itechart.forum.post.dto.*;
import com.itechart.forum.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;

public interface PostService {
    @Transactional
    int save(PostAddDto postAddDto);

    @Transactional
    void update(PostUpdateDto postUpdateDto);

    @Transactional
    void delete(Integer id);

    Page<PostInfoDto> get(PostFilterDto filter, Pageable pageable);

    PostFullInfoDto getById(Integer id);
}
