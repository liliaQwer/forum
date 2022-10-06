package com.itechart.forum.post.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.itechart.forum.common.exception.ResourceNotFoundException;
import com.itechart.forum.post.dto.PostAddDto;
import com.itechart.forum.post.dto.PostFilterDto;
import com.itechart.forum.post.dto.PostInfoDto;
import com.itechart.forum.post.service.PostService;
import com.itechart.forum.post.type.CategoryType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.time.LocalDate;
import java.util.List;
import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class PostControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PostService service;

    private List<PostInfoDto> postList;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void popultePostList(){
        PostInfoDto post1 = new PostInfoDto(1, "Post 1", CategoryType.FOOD, "Post about food", "Test content", LocalDate.of(2022, 9, 30), "Test", 1);
        PostInfoDto post2 = new PostInfoDto(2, "Post 2", CategoryType.SCIENCE, "Post about science", "Test content", LocalDate.of(2022, 9, 20), "Test", 1);
        postList = List.of(post1,post2);
    }

    @Test
    @DisplayName("Display all posts")
    public void whenGet_thenAllPostList() throws Exception {
        Page<PostInfoDto> postPage = new PageImpl(postList);
        when(service.get(Mockito.any(PostFilterDto.class), Mockito.any(Pageable.class))).thenReturn(postPage);

        mockMvc.perform(get("/posts"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.content.size()").value(2))
                .andExpect(jsonPath("$.content.[0].title").value("Post 1"))
                .andExpect(jsonPath("$.content.[1].category").value(CategoryType.SCIENCE.toString()));
    }

    @Test
    @DisplayName("Get post by Id")
    public void whenGetById_thenReturnPost() throws Exception {
        int param = 1;
        when(service.getById(param)).thenReturn(postList.get(param));
        mockMvc.perform(get("/posts/" + param))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.title").value("Post 2"));
    }

    @Test
    @DisplayName("Check Not Found for get post by Id")
    public void whenGetById_thenNotFound() throws Exception {
        int param = 3;
        when(service.getById(param)).thenThrow(ResourceNotFoundException.class);
        mockMvc.perform(get("/posts/" + param))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("Add a post")
    public void whenAddPost_thenReturnId() throws Exception {
        int id = 1;
        when(service.save(Mockito.any(PostAddDto.class))).thenReturn(id);

        PostAddDto postToAdd = new PostAddDto("Test title", CategoryType.FOOD, "Test description", "Test content");
        mockMvc.perform(post("/posts").contentType(MediaType.APPLICATION_JSON_UTF8)
                                                .content(objectMapper.writeValueAsString(postToAdd)))
            .andExpect(status().isOk())
            .andExpect(content().string("1"));
    }

    @Test
    @DisplayName("Check validation when Add a post")
    public void whenAddInvalidPost_thenReturnBadRequest() throws Exception {
        PostAddDto postToAdd = new PostAddDto("Test title", CategoryType.FOOD, null, "Test content");
        mockMvc.perform(post("/posts").contentType(MediaType.APPLICATION_JSON_UTF8)
                .content(objectMapper.writeValueAsString(postToAdd)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("Description cannot be empty")));
    }

}
