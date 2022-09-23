package com.itechart.forum.post.controller;

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
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
//@WebMvcTest(controllers = PostCategoryController.class) and add mock to every dependency in SecurityConfig
public class PostCategoryControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void whenGet_thenAllPostCategoriesList() throws Exception {
        mockMvc.perform(get("/post_categories")).andExpect(status().isOk());
    }
}
