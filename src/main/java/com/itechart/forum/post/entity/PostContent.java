package com.itechart.forum.post.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "post_content")
public class PostContent{

    @Id
    @Column(name = "post_id")
    private Integer id;

    private String body;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;
}
