package com.itechart.forum.post.entity;

import com.itechart.forum.post.type.CategoryType;
import com.itechart.forum.user.entity.User;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Entity
@Table(name = "post")
@SecondaryTable(name = "post_content", pkJoinColumns = @PrimaryKeyJoinColumn(name = "fk_post_id", referencedColumnName = "id"))
public class Post {
    @Id
    @GeneratedValue(generator = "post_id_generator")
    @SequenceGenerator(name = "post_id_generator", sequenceName = "post_id_seq", allocationSize = 1)
    private Integer id;

    @NotNull(message = "title.notnull")
    @Size(max = 50, message = "{title.maxsize}")
    private String title;

    @Enumerated(EnumType.ORDINAL)
    @NotNull(message = "category.notnull")
    private CategoryType category;

    @NotNull(message = "title.notnull")
    @Size(max = 100, message = "{description.maxsize}")
    private String description;

    @Basic(fetch = FetchType.LAZY)
    @NotNull(message = "body.notnull")
    private String body;

    @Column(nullable = false, updatable = false)
    @CreatedDate
    private LocalDate createdDate;

    @CreatedBy
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @Column(nullable = false, updatable = false)
    @LastModifiedDate
    private LocalDate modifiedDate;

    @Version
    private int version;
}
