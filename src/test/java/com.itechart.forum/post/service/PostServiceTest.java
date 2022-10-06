package com.itechart.forum.post.service;

import com.itechart.forum.common.exception.ResourceNotFoundException;
import com.itechart.forum.post.dto.PostUpdateDto;
import com.itechart.forum.post.entity.Post;
import com.itechart.forum.post.repository.PostRepository;
import com.itechart.forum.post.type.CategoryType;
import com.itechart.forum.security.userdetails.UserDetailsImpl;
import com.itechart.forum.user.dto.UserFullInfoDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import javax.naming.NoPermissionException;
import javax.persistence.EntityNotFoundException;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PostServiceTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private UserDetailsImpl userDetails;

    private PostServiceImpl postService;

    private final static String TEST_USER = "TestUser";
    private final static String TEST_TITLE = "Test tittle";

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
        postService = new PostServiceImpl(postRepository, new ModelMapper());
    }

    @Test
    public void whenGetByIdThenReturnPost() throws ResourceNotFoundException {
        Post post = getTestPost();
        int id = post.getId();

        when(postRepository.getOne(id)).thenReturn(post);

        assertThat(postService.getById(id).getTitle()).isEqualTo(TEST_TITLE);
    }

    @Test
    public void whenGetByIdThenThrowException(){
        when(postRepository.getOne(Mockito.any())).thenThrow(EntityNotFoundException.class);
        assertThrows(ResourceNotFoundException.class, () -> postService.getById(1));
    }

    @Test
    public void whenUpdateNotExistedPostThenThrowException(){
        when(postRepository.getOne(Mockito.any())).thenThrow(EntityNotFoundException.class);
        assertThrows(ResourceNotFoundException.class, () -> postService.update(userDetails,1, new PostUpdateDto()));
    }

    @Test
    public void whenUpdateNotOwnPostThenThrowException(){
        Post post = getTestPost();

        UserDetailsImpl userDetails = getUserDetails("Random");
        when(postRepository.getOne(Mockito.any())).thenReturn(post);
        assertThrows(NoPermissionException.class, () -> postService.update(userDetails,1, new PostUpdateDto()));
    }

    private UserDetailsImpl getUserDetails(String userName){
        UserFullInfoDto user = new UserFullInfoDto();
        user.setLogin(userName);
        UserDetailsImpl userDetails = new UserDetailsImpl(user);
        return userDetails;
    }

    private Post getTestPost(){
        Post post = new Post();
        post.setId(1);
        post.setCategory(CategoryType.FOOD);
        post.setDescription("Test Description");
        post.setTitle(TEST_TITLE);
        post.setCreatedBy(TEST_USER);
        return post;
    }
}
