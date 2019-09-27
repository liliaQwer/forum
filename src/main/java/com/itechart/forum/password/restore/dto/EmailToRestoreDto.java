package com.itechart.forum.password.restore.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class EmailToRestoreDto {
    @Email(message = "{email.incorrect}")
    @NotEmpty(message = "{email.notnull}")
    private  String email;
}
