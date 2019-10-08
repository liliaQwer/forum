package com.itechart.forum.post.dto;

import com.itechart.forum.post.type.CategoryType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostInfoDto {
    private Integer id;

    private String title;

    private CategoryType category;

    private String description;

    private LocalDate createdDate;

    private String createdBy;

}
