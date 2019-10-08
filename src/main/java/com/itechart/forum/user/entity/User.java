package com.itechart.forum.user.entity;

import com.itechart.forum.user.type.RoleType;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "\"user\"")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(generator = "user_id_generator")
    @SequenceGenerator(name = "user_id_generator", sequenceName = "user_id_seq", allocationSize = 1)
    private Integer id;

    private String login;

    private String email;

    private String password;

    @Enumerated(EnumType.ORDINAL)
    private RoleType role;

    @Column(nullable = false, updatable = false)
    @CreatedDate
    private LocalDate createdDate;
}
