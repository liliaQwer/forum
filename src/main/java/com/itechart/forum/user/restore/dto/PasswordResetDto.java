package com.itechart.forum.user.restore.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class PasswordResetDto {
    @NotEmpty
    private String password;

    @NotEmpty
    private String confirmPassword;

    @NotEmpty
    private String token;

    @AssertTrue(message="{password.mismatch}")
    private boolean isSamePassword(){
        return this.password.equals(this.confirmPassword);
    }
}
