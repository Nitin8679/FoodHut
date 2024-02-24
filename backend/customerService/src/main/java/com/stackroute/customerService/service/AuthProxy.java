package com.stackroute.customerService.service;

import com.stackroute.customerService.domain.AuthRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="auth-app",url = "localhost:8067")
public interface AuthProxy {
    @PostMapping("/api/auth/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest authRequest);

    @PostMapping("/api/auth/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest);
}
