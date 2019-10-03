package com.itechart.forum.post.dto;

import com.itechart.forum.post.type.CategoryType;
import lombok.Data;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class PostUpdateDto {
    private Integer id;

    @Size(max = 50, message = "{title.maxsize}")
    private String title;

    @Enumerated(EnumType.ORDINAL)
    private CategoryType category;

    @Size(max = 100, message = "{description.maxsize}")
    private String description;

    private String content;
}
