package com.itechart.forum.post.service;

import com.itechart.forum.post.dto.*;
import com.itechart.forum.post.entity.Post;
import com.itechart.forum.post.entity.QPost;
import com.itechart.forum.post.repository.PostRepository;
import com.querydsl.core.BooleanBuilder;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService{

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public int save(PostAddDto postAddDto) {
        Post post = modelMapper.map(postAddDto, Post.class);
        postRepository.save(post);
        return post.getId();
    }

    @Override
    public void update(PostUpdateDto postUpdateDto) {
        Post post = postRepository.getOne(postUpdateDto.getId());
        modelMapper.map(postUpdateDto, post);
    }

    @Override
    public void delete(Integer id) {
         postRepository.deleteById(id);
    }

    @Override
    public Page<PostInfoDto> get(PostFilterDto filter, Pageable pageable) {
        QPost post = QPost.post;
        BooleanBuilder predicate = new BooleanBuilder();
        if (filter.getCategory() != null){
            predicate.and(post.category.eq(filter.getCategory()));
        }
        if (filter.getTitle() != null){
            predicate.and(post.title.contains(filter.getTitle()));
        }
        if (filter.getCreatedBy() != null){
            predicate.and(post.createdBy.eq(filter.getCreatedBy()));
        }
        if (filter.getCreatedDate() != null){
            predicate.and(post.createdDate.eq(filter.getCreatedDate()));
        }
        Page<Post> postPage = postRepository.findAll(predicate, pageable);
        return postPage.map((postElement) -> modelMapper.map(post, PostInfoDto.class));
    }

    @Override
    public PostFullInfoDto getById(Integer id) {
        Post post = postRepository.getOne(id);
        return modelMapper.map(post, PostFullInfoDto.class);
    }
}
