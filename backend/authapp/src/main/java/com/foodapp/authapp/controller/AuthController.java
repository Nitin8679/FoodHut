package com.foodapp.authapp.controller;

import com.foodapp.authapp.exception.OTPMismatchException;
import com.foodapp.authapp.exception.PasswordMismatchException;
import com.foodapp.authapp.exception.UserNotFoundException;
import com.foodapp.authapp.model.User;
import com.foodapp.authapp.service.JwtGenerator;
import com.foodapp.authapp.service.UserService;
import com.foodapp.authapp.service.UserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private int otp;
    @Autowired
    private UserService userService;

    @Autowired
    JwtGenerator jwtGenerator;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
//        System.out.println(user);

        return new ResponseEntity<>(userService.registerUser(user), HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginCheck(@RequestBody User user) throws UserNotFoundException {
        try{
        Map<String,Integer> otpmap=userService.loginCheck(user.getEmail());
        otp=otpmap.get("OTP");
        return new ResponseEntity<>(otpmap,HttpStatus.OK);}
        catch (UserNotFoundException e){
            throw new UserNotFoundException();
        }
    }
    @PostMapping("/checkOTP/{num}")
    public ResponseEntity<?> checkOTP(@RequestBody User user,@PathVariable int num) throws UserNotFoundException, OTPMismatchException {
        System.out.println(otp);
        if(otp==num){
            try{
                User tempUser=userService.getUserDetails(user.getEmail());
                return new ResponseEntity<>(jwtGenerator.generateJwt(tempUser),HttpStatus.OK);
            } catch (UserNotFoundException e) {
                throw new UserNotFoundException();
            }
        }
        else {
                throw new OTPMismatchException();
        }
    }
    @GetMapping("/delete/{userId}")
    public ResponseEntity<?> delete(@PathVariable String userId){
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/getOTP")
    public ResponseEntity<?> getOTP(@RequestBody User user) throws UserNotFoundException {
        Map<String,Integer> otpmap=userService.getOTP(user.getEmail());
        otp=otpmap.get("OTP");
        System.out.println(otp);
        return new ResponseEntity<>(otpmap,HttpStatus.OK);
    }
}
