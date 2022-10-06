package com.itechart.forum.user.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public record LoginDto (

    @NotNull(message = "{login.notnull}")
    @NotBlank(message = "{login.notblank}")
    @Size(max = 20, message = "{login.maxsize}")
    String login,

    @NotNull(message = "{password.notnull}")
    @NotBlank(message = "{password.notblank}")
    @Size(max = 20, message = "{password.maxsize}")
    String password) {}
