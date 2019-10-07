package com.itechart.forum.websocket.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewCommentNotification {
    private String content = "A new comment has been added";
}
