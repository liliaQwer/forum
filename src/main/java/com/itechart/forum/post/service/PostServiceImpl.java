package com.itechart.forum.post.service;

import com.itechart.forum.post.dto.FilterPostDto;
import com.itechart.forum.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public class PostServiceImpl implements PostService{
    @Override
    public int save(Post post) {
        return 0;
    }

    @Override
    public void update(Post post) {

    }

    @Override
    public int delete(int id) {
        return 0;
    }

    @Override
    public Page<Post> find(FilterPostDto filter, Pageable pageable) {
        return null;
    }

    @Override
    public Post getById(int id) {
        return null;
    }
}
