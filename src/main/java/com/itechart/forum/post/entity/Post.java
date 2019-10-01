package com.itechart.forum.post.entity;

import com.itechart.forum.comment.Comment;
import com.itechart.forum.post.type.CategoryType;
import com.itechart.forum.user.entity.User;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "post")
@EntityListeners(AuditingEntityListener.class)
@SecondaryTable(name = "post_content", pkJoinColumns = @PrimaryKeyJoinColumn(name = "fk_post_id", referencedColumnName = "id"))
@Data
public class Post {
    @Id
    @GeneratedValue(generator = "post_id_generator")
    @SequenceGenerator(name = "post_id_generator", sequenceName = "post_id_seq", allocationSize = 1)
    private Integer id;

    private String title;

    @Enumerated(EnumType.ORDINAL)
    private CategoryType category;

    private String description;

    @Basic(fetch = FetchType.LAZY)
    private String body;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post")
    private List<Comment> commentList;

    @Column(nullable = false, updatable = false)
    @CreatedDate
    private LocalDate createdDate;

    @CreatedBy
//    @ManyToOne
//    @JoinColumn(name = "created_by")
//    private User createdBy;
    private Integer createdBy;

    @Column(nullable = false, updatable = false)
    @LastModifiedDate
    private LocalDate modifiedDate;

    @Version
    private int version;
}
