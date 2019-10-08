package com.itechart.forum.user.restore.entity;

import lombok.Data;

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

    private Integer userId;

    public boolean isExpired(){
        return LocalDate.now().isAfter(this.expireDate);
    }

}
