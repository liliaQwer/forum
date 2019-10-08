package com.itechart.forum.comment.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CommentInfoDto {
    private Integer id;

    private String content;

    private Integer likesCount;

    private Integer dislikesCount;

    private String createdBy;

    private LocalDate createdDate;
}
