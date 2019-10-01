package com.itechart.forum;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
public class ForumApplication {

    public static void main(String[] args){
        SpringApplication.run(ForumApplication.class);
    }
}
