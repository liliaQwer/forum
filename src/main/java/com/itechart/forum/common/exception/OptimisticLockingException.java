package com.itechart.forum.common.exception;

public class OptimisticLockingException extends Exception {
    public OptimisticLockingException(String message){
        super(message);
    }
}
