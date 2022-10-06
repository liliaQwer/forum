package com.itechart.forum.post.dto;

import com.itechart.forum.post.type.CategoryType;

public record PostFilterDto (
    CategoryType category,
    String content) {}
