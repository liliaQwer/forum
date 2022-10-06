package com.itechart.forum.post.controller;

import com.itechart.forum.post.type.CategoryType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
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
