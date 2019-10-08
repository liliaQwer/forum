package com.itechart.forum.post.dto;

import com.itechart.forum.post.type.CategoryType;
import lombok.Data;

@Data
public class PostFilterDto {

//    private String title;

    private CategoryType category;

//    private LocalDate createdDate;
}
