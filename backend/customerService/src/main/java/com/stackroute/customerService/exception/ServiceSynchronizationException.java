package com.stackroute.customerService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "service exception",code = HttpStatus.INTERNAL_SERVER_ERROR)
public class ServiceSynchronizationException extends Exception{
    public ServiceSynchronizationException() {
    }

    public ServiceSynchronizationException(String message) {
        super(message);
    }
}
