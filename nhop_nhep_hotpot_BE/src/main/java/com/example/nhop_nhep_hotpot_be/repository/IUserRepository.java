package com.example.nhop_nhep_hotpot_be.repository;

import com.example.nhop_nhep_hotpot_be.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

public interface IUserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserName(String username);
    Boolean existsByUserName(String username);
    Boolean existsByEmail(String email);

    @Modifying
    @Transactional
    @Query(value = "UPDATE user SET password = :newPassword WHERE id = :id",nativeQuery = true)
    void updatePassword(@Param("newPassword")String newPassword, @Param("id")Integer id);
    User findByEmail( String email);
    @Modifying
    @Transactional
    @Query(value = "UPDATE user set expiry_time = :expiryTime , otp_secret = :otpSecret where email = :email",nativeQuery = true)
    void updateOtp(@Param("expiryTime") LocalDateTime expiryTime, @Param("otpSecret")String otpSecret, @Param("email")String email);
}