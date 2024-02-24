package com.foodapp.authapp.service;

import com.foodapp.authapp.exception.PasswordMismatchException;
import com.foodapp.authapp.exception.UserNotFoundException;
import com.foodapp.authapp.model.EmailDTO;
import com.foodapp.authapp.model.User;

import com.foodapp.authapp.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class UserServiceImpl implements UserService {



    private AuthRepository authRepository;
    private JwtGenerator jwtGenerator;
    private EmailProxy emailProxy;
    @Autowired
    UserServiceImpl(AuthRepository authRepository,JwtGenerator jwtGenerator,EmailProxy emailProxy){
        this.authRepository=authRepository;
        this.jwtGenerator=jwtGenerator;
        this.emailProxy=emailProxy;
    }

    @Override
    public User registerUser(User user) {
        return authRepository.save(user);
    }

    @Override
    public Map<String,Integer> loginCheck(String emailId) throws UserNotFoundException {
        Optional<User> userOptional = authRepository.findById(emailId);
        if(userOptional.isEmpty()){
            throw new UserNotFoundException();
        }
        return getOTP(emailId);
    }

    @Override
    public Map<String, Integer> getOTP(String emailID) throws UserNotFoundException {
        if(authRepository.findById(emailID).isPresent()){
            Random rand=new Random();
            Map<String,Integer> otpmap=new HashMap<>();
            int random=rand.nextInt(1000,9999);
            otpmap.put("OTP", random);
            String msgBody="OTP for login is : "+random;
            EmailDTO emailDTO=new EmailDTO(emailID,msgBody,"One Time Password for login",null);
            ResponseEntity<String> resp=emailProxy.sendEmailDTO(emailDTO);

            return otpmap;
        }
        else {
            throw new UserNotFoundException();
        }
    }

    @Override
    public User getUserDetails(String emailID) throws UserNotFoundException {
        if (authRepository.findById(emailID).isPresent()){
            return authRepository.findById(emailID).get();
        }
        else{
            throw new UserNotFoundException();
        }
    }
}
