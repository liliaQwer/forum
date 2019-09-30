package com.itechart.forum.comment.dto;

import com.itechart.forum.post.dto.PostInfoDto;
import com.itechart.forum.user.entity.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CommentInfoDto {
    private Integer id;

    private String content;

    private Integer likesCount;

    private Integer dislikesCount;

    private PostInfoDto post;

    private User createdBy;

    private LocalDate createdDate;
}
