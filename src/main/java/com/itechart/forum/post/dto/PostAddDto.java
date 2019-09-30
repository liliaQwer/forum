package com.itechart.forum.post.dto;

import com.itechart.forum.post.type.CategoryType;
import lombok.Data;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class PostAddDto {

    @Size(max = 50, message = "{title.maxsize}")
    @NotNull(message = "{title.notnull}")
    private String title;

    @Enumerated(EnumType.ORDINAL)
    @NotNull(message = "category.notnull")
    private CategoryType category;

    @Size(max = 100, message = "{description.maxsize}")
    @NotNull(message = "description.notnull")
    private String description;

    @NotNull(message = "body.notnull")
    private String body;
}
