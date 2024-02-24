package com.foodapp.authapp.repository;

import com.foodapp.authapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<User,String> {
    public Optional<User> findByEmailAndPassword(String email, String password);
}
