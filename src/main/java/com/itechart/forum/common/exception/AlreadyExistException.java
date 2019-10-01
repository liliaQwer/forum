package com.itechart.forum.common.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

public class AlreadyExistException extends Exception {
    public AlreadyExistException(String message){
        super(message);
    }
}
