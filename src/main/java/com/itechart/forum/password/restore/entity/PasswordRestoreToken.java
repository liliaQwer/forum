package com.itechart.forum.password.restore.entity;

import com.itechart.forum.user.entity.User;
import lombok.Data;

import javax.jws.soap.SOAPBinding;
import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "restore_password")
@Data
public class PasswordRestoreToken {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reset_password_id_seq")
    @SequenceGenerator(name = "reset_password_id_seq", sequenceName = "reset_password_id_seq", allocationSize = 1)
    private  Integer id;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private LocalDate expireDate;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    public boolean isExpired(){
        return LocalDate.now().isAfter(this.expireDate);
    }

}
