package com.itechart.forum.comment.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class CommentAddDto {

    @Size(max = 200, message = "{content.maxsize}")
    @NotNull(message = "{content.notnull}")
    private String content;

    private Integer postId;
}
