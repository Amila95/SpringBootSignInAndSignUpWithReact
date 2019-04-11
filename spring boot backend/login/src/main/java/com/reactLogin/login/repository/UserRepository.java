package com.reactLogin.login.repository;

import com.reactLogin.login.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

//    User findByName(String name);

    User getById(Long id);

    User findByUsername(String username);
}
