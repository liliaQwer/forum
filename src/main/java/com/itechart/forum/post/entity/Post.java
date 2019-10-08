package com.itechart.forum.post.entity;

import com.itechart.forum.comment.Comment;
import com.itechart.forum.post.type.CategoryType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "post")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class Post {
    @Id
    @GeneratedValue(generator = "post_id_generator")
    @SequenceGenerator(name = "post_id_generator", sequenceName = "post_id_seq", allocationSize = 1)
    private Integer id;

    private String title;

    @Enumerated(EnumType.ORDINAL)
    private CategoryType category;

    private String description;


    //    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @PrimaryKeyJoinColumn
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "post")
    @Fetch(FetchMode.JOIN)
    private PostContent content;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post", orphanRemoval = true)
    private List<Comment> commentList;

    @Column(nullable = false, updatable = false)
    @CreatedDate
    private LocalDate createdDate;

    @CreatedBy
    private String createdBy;

    @Column(nullable = false, updatable = false)
    @LastModifiedDate
    private LocalDate modifiedDate;

    @Version
    private int version;
}
