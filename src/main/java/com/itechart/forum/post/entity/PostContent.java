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
    @Column(name = "fk_post_id")
    private Integer id;

    //    @Lob
//    @Type(type = "org.hibernate.type.TextType")

    private String body;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_post_id")
//    @OneToOne(mappedBy = "content")
//    @MapsId
//    @JoinColumn(name = "fk_post_id")
    private Post post;
}
