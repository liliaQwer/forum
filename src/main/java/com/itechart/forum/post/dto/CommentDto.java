package com.itechart.forum.post.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class CommentDto{
    private String content;
    private Integer likesCount;
    private Integer dislikesCount;
    private String createdBy;
    private LocalDate createdDate;
}
