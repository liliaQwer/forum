package com.itechart.forum.post.dto;

import com.itechart.forum.post.type.CategoryType;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public record PostAddDto (

    @Size(max = 50, message = "{title.maxsize}")
    @NotEmpty(message = "{title.notempty}")
    String title,

    @NotNull(message = "category.notempty")
    CategoryType category,

    @Size(max = 100, message = "{description.maxsize}")
    @NotEmpty(message = "{description.notempty}")
    String description,

    @NotEmpty(message = "{body.notempty}")
    String content) {}
