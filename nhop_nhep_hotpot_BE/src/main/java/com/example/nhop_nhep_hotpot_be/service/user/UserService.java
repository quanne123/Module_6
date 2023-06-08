package com.example.nhop_nhep_hotpot_be.service.user;

import com.example.nhop_nhep_hotpot_be.model.user.User;
import com.example.nhop_nhep_hotpot_be.repository.user.IUserRepository;
import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements IUserService {
    @Autowired
    IUserRepository iUserRepository;
    @Autowired
    @Lazy
    PasswordEncoder passwordEncoder;

    @Override
    public Optional<User> findByUsername(String name) {
        return iUserRepository.findByUserName(name);
    }


    @Override
    public Boolean existsByUsername(String username) {
        return iUserRepository.existsByUserName(username);
    }
    @Override
    public Boolean existsByEmail(String email) {
        return iUserRepository.existsByEmail(email);
    }

    @Override
    public Boolean checkIfValidOldPassword(User user, String oldPassword) {
        return passwordEncoder.matches(oldPassword, user.getPassword());
    }

    @Override
    public void changeUserPassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        iUserRepository.updatePassword(user.getPassword(), user.getId());
    }

    @Override
    public User findByEmailUser(String email) {
        return iUserRepository.findByEmail(email);
    }

    @Override
    public void updateOtp(User user) {
        iUserRepository.updateOtp(user.getExpiryTime(), user.getOtpSecret(), user.getEmail());
    }

    @Override
    public void save(User user) {
        iUserRepository.save(user);
    }
}
