package com.itechart.forum.comment.dto;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class CommentUpdateDto {

    private Integer id;

    @Size(max = 200, message = "{content.maxsize}")
    private String content;
}
