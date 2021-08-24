package com.itechart.forum.post.service;

import com.itechart.forum.common.exception.OptimisticLockingException;
import com.itechart.forum.common.exception.ResourceNotFoundException;
import com.itechart.forum.post.dto.*;
import com.itechart.forum.post.entity.Post;
import com.itechart.forum.post.entity.PostContent;
import com.itechart.forum.post.entity.QPost;
import com.itechart.forum.post.repository.PostRepository;
import com.itechart.forum.post.type.CategoryType;
import com.querydsl.core.BooleanBuilder;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.naming.NoPermissionException;
import javax.persistence.EntityNotFoundException;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {
    @Value("${pagination.page_size.min}")
    private int minPageSize;

    @Value("${pagination.page_size.max}")
    private int maxPageSize;

    @Value("${pagination.page_size.default}")
    private int defaultPageSize;

    private PostRepository postRepository;

    private ModelMapper modelMapper;

    @Autowired
    public PostServiceImpl(PostRepository postRepository, ModelMapper modelMapper) {
        this.postRepository = postRepository;
        this.modelMapper = modelMapper;

        this.modelMapper.addMappings(new PropertyMap<Post, PostInfoDto>() {
            @Override
            protected void configure() {
                map(source.getContent().getBody(), destination.getContent());
            }
        });
        this.modelMapper.addMappings(new PropertyMap<PostUpdateDto, Post>() {
            @Override
            protected void configure() {
                map(source.getContent(), destination.getContent().getBody());
            }
        });
    }

    @Override
    public int save(PostAddDto postAddDto) {
        Post post = new Post();
        post.setCategory(postAddDto.getCategory());
        PostContent content = new PostContent();
        content.setBody(postAddDto.getContent());
        content.setPost(post);
        post.setContent(content);
        post.setDescription(postAddDto.getDescription());
        post.setTitle(postAddDto.getTitle());

        //Post post = modelMapper.map(postAddDto, Post.class);
        postRepository.save(post);
        return post.getId();
    }

    @Override
    public void update(UserDetails userDetails, int id, PostUpdateDto postUpdateDto) throws NoPermissionException, ResourceNotFoundException, OptimisticLockingException {
        Post post = getPostIfAllowed(userDetails, id);
        checkVersion(postUpdateDto.getVersion(), post);
        postUpdateDto.setId(id);
        modelMapper.map(postUpdateDto, post);
    }

    @Override
    public void delete(UserDetails userDetails, int... ids) throws NoPermissionException, ResourceNotFoundException {
        for (int id : ids) {
            getPostIfAllowed(userDetails, id);
            postRepository.deleteById(id);
        }
    }

    @Override
    public Page<PostInfoDto> get(PostFilterDto filter, Pageable pageable) {
        if (pageable.getPageSize() < minPageSize || pageable.getPageSize() > maxPageSize) {
            pageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize, Sort.Direction.DESC, "createdDate");
        }
        Page<Post> postDto;
        boolean isEmptyContentToFind = filter.getContent() == null || filter.getContent().isEmpty();
        if (filter.getCategory() != null && filter.getCategory() != CategoryType.All) {
            if (isEmptyContentToFind) {
                postDto = postRepository.findByCategory(filter.getCategory(), pageable);
            } else {
                postDto = postRepository.findByCategoryAndContentBodyContaining(filter.getCategory(), filter.getContent(), pageable);
            }
        } else if (!isEmptyContentToFind) {
            postDto = postRepository.findByContentBodyContaining(filter.getContent(), pageable);
        } else {
            postDto = postRepository.findAll( pageable);
        }
        Page<PostInfoDto> postInfoDto = postDto.map((post)-> modelMapper.map(post, PostInfoDto.class));
        return postInfoDto;
    }

    @Override
    public PostInfoDto getById(Integer id) throws ResourceNotFoundException {
        Post post;
        try {
            post = postRepository.getOne(id);
            post.getId();
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Post not found with this id: " + id);
        }
        return modelMapper.map(post, PostInfoDto.class);
    }

    private Post getPostIfAllowed(UserDetails userDetails, int id) throws NoPermissionException, ResourceNotFoundException {
        Post post;
        try {
            post = postRepository.getOne(id);
            post.getId();
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Post not found with this id: " + id);
        }
        if (!post.getCreatedBy().equals(userDetails.getUsername()) &&
                !userDetails.getAuthorities().contains("ADMIN")) {
            throw new NoPermissionException("You have no permission for this operation with post with id: " + id);
        }
        return post;
//        return postRepository.getOne(id);
    }

    private void checkVersion(int oldVersion, Post post) throws OptimisticLockingException {
        if (oldVersion != post.getVersion()) {
            throw new OptimisticLockingException("Post has already been updated by " + post.getCreatedBy());
        }
    }

}
