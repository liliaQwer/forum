package com.itechart.forum.comment.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class CommentAddDto {

    @Size(max = 200, message = "{content.maxsize}")
    @NotEmpty(message = "{content.notempty}")
    private String content;

    private Integer postId;
}
