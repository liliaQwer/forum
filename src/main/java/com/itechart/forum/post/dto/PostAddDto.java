package com.itechart.forum.post.dto;

import com.itechart.forum.post.type.CategoryType;
import lombok.Data;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class PostAddDto {

    @Size(max = 50, message = "{title.maxsize}")
    @NotEmpty(message = "{title.notempty}")
    private String title;

    @NotNull(message = "category.notempty")
    private CategoryType category;

    @Size(max = 100, message = "{description.maxsize}")
    @NotEmpty(message = "{description.notempty}")
    private String description;

   @NotEmpty(message = "{body.notempty}")
    private String content;
}
