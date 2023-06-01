package com.example.nhop_nhep_hotpot_be.service;

import com.example.nhop_nhep_hotpot_be.model.user.User;

public interface IEmailService {
    void sendResetPasswordEmail (String email, String otp);

    boolean validateOtp (String otpCode, String email);

    String generateOtp(User user);
}
