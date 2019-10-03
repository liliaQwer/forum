package com.itechart.forum.post.dto;

import com.itechart.forum.post.type.CategoryType;
import com.itechart.forum.user.entity.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PostInfoDto {
    private Integer id;

    private String title;

    private CategoryType category;

    private String description;

    private LocalDate createdDate;

    private String createdBy;

}
