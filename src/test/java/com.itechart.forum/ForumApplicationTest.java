package com.itechart.forum;

import com.itechart.forum.post.controller.PostCategoryController;
import com.itechart.forum.post.controller.PostController;
import com.itechart.forum.post.repository.PostRepository;
import com.itechart.forum.post.service.PostServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class ForumApplicationTest {

    @Autowired
    private PostController postController;

    @Autowired
    private PostCategoryController postCategoryController;

    @Autowired
    private PostServiceImpl postService;

    @Autowired
    private PostRepository postRepository;

    @Test
    @DisplayName("ContextLoadsPostContollers")
    public void whenRun_thenContextLoadsPostContollers()  {
        assertThat(postController).isNotNull();
        assertThat(postCategoryController).isNotNull();
    }

    @Test
    @DisplayName("ContextLoadsPostService")
    public void whenRun_thenContextLoadsPostService()  {
        assertThat(postService).isNotNull();
    }

    @Test
    @DisplayName("ContextLoadsPostService")
    public void whenRun_thenContextLoadsPostRepo()  {
        assertThat(postRepository).isNotNull();
    }
}