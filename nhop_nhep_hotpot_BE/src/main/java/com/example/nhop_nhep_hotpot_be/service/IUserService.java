package com.example.nhop_nhep_hotpot_be.service;

import com.example.nhop_nhep_hotpot_be.model.user.User;

import java.util.Optional;

public interface IUserService {
    Optional<User> findByUsername(String name);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    Boolean checkIfValidOldPassword(User user, String oldPassword);

    void changeUserPassword(User user,String newPassword);

    User findByEmailUser(String email);

    void updateOtp(User user);


}
