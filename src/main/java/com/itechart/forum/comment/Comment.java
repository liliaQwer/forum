package com.itechart.forum.comment;

import com.itechart.forum.post.entity.Post;
import com.itechart.forum.user.entity.User;
import javafx.geometry.Pos;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "post_comment")
@EntityListeners(AuditingEntityListener.class)
@Data
public class Comment {
    @Id
    @GeneratedValue(generator = "comment_id_generator")
    @SequenceGenerator(name = "comment_id_generator", sequenceName = "post_comment_id_seq", allocationSize = 1)
    private Integer id;

    private String content;

    private Integer likesCount;

    private Integer dislikesCount;

    @ManyToOne(targetEntity = Post.class)
    @JoinColumn(name = "post_id")
    private Post post;

    @CreatedBy
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @Column(nullable = false, updatable = false)
    @CreatedDate
    private LocalDate createdDate;
}
