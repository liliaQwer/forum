package com.itechart.forum.websocket;

import com.itechart.forum.websocket.service.SocketCommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class ContextRefreshedHandler implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private SimpMessagingTemplate template;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        try{
            SocketCommentService.setTemplate(template);
        }catch (Exception ex){
            log.error(getClass().getName(), ex);
        }
    }
}
