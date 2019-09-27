package com.itechart.forum.comment;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
public class PostComment {
    @Id
    private Integer id;
    private String content;
    private Integer likesCount;
    private Integer dislikesCount;
    private Integer createedBy;
    private LocalDate createdDate;
}
