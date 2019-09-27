package com.itechart.forum.user.entity;

import com.itechart.forum.user.type.RoleType;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "\"user\"")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
public class User {

    public User(User user){
        this.id = user.id;
        this.login = user.login;
        this.password = user.password;
        this.email = user.email;
        this.createdDate = user.createdDate;
    }

    @Id
    @GeneratedValue(generator = "user_id_generator")
    @SequenceGenerator(name = "user_id_generator", sequenceName = "user_id_seq", allocationSize = 1)
    private Integer id;

    @NotNull(message = "{login.notnull}")
    @Size(max = 20, message = "{login.maxsize}")
    private String login;

    @NotNull(message = "{email.notnull}")
    @Size(max = 50, message = "{email.maxsize}")
    @Email(message = "{email.incorrect}")
    private String email;

    @NotNull(message = "{password.notnull}")
    @Size(max = 20, message = "{password.maxsize}")
    private String password;

    @Enumerated(EnumType.ORDINAL)
    private RoleType role = RoleType.USER;

    @Column(nullable = false, updatable = false)
    @CreatedDate
    private LocalDate createdDate;
}
