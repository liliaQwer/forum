package com.itechart.forum.post.service;

import com.itechart.forum.post.dto.FilterPostDto;
import com.itechart.forum.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface PostService {
    @Transactional
    int save(Post post);
    @Transactional
    void update(Post post);
    @Transactional
    int delete(int id);
    Page<Post> find(FilterPostDto filter, Pageable pageable);
    Post getById(int id);
}
