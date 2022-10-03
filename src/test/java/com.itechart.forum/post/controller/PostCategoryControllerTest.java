package com.itechart.forum.post.controller;

import com.itechart.forum.post.type.CategoryType;
import com.itechart.forum.security.SecurityConfig;
import com.itechart.forum.security.filter.JwtRequestFilter;
import com.itechart.forum.security.jwt.JwtAuthenticationEntryPoint;
import com.itechart.forum.security.userdetails.UserDetailsServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;

import java.util.Arrays;

import static org.modelmapper.internal.bytebuddy.matcher.ElementMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
//@WebMvcTest(controllers = PostCategoryController.class) and add mock to every dependency in SecurityConfig
public class PostCategoryControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void whenGet_thenAllPostCategoriesList() throws Exception {
        mockMvc.perform(get("/post_categories"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.size()").value(5))
                .andExpect(jsonPath("$[0]").value(CategoryType.All.toString()))
                .andExpect(jsonPath("$[1]").value(CategoryType.SCIENCE.toString()))
                .andExpect(jsonPath("$[2]").value(CategoryType.EDUCATION.toString()))
                .andExpect(jsonPath("$[3]").value(CategoryType.SPORT.toString()))
                .andExpect(jsonPath("$[4]").value(CategoryType.FOOD.toString()));
    }
}
