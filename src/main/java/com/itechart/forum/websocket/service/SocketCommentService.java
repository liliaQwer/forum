package com.itechart.forum.websocket.service;

import com.itechart.forum.websocket.dto.NewCommentNotification;
import org.springframework.messaging.simp.SimpMessagingTemplate;

public class SocketCommentService {
    private static SimpMessagingTemplate template;

    public static void setTemplate(SimpMessagingTemplate templ){
        template =templ;
    }

    public static void sendNotification(String destination){
     template.convertAndSend("/topic" + destination, new NewCommentNotification());
    }
}
