package com.itechart.forum.post.controller;

import com.itechart.forum.post.type.CategoryType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "/post_categories")
public class PostCategoryController {

    @GetMapping
    public ResponseEntity<List<CategoryType>> getAllPostCategories(){
        return new ResponseEntity<>(Arrays.asList(CategoryType.values()), HttpStatus.OK);
    }
}
