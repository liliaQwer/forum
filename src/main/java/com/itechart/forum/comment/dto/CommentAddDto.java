package com.itechart.forum.comment.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public record CommentAddDto (

    @Size(max = 200, message = "{content.maxsize}")
    @NotEmpty(message = "{content.notempty}")
    String content,

    Integer postId) {}
