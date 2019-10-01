package com.itechart.forum.post.dto;

import com.itechart.forum.post.type.CategoryType;
import com.itechart.forum.user.entity.User;
import lombok.Data;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
public class PostFilterDto {

    @Size(max = 50, message = "{title.maxsize}")
    private String title;

    @Enumerated(EnumType.ORDINAL)
    private CategoryType category;

    private LocalDate createdDate;

    private Integer createdBy;

}
