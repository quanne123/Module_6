package com.example.nhop_nhep_hotpot_be.controller;

import com.example.nhop_nhep_hotpot_be.dto.MailDTO;
import com.example.nhop_nhep_hotpot_be.dto.OtpDTO;
import com.example.nhop_nhep_hotpot_be.dto.request.ChangePasswordRequest;
import com.example.nhop_nhep_hotpot_be.dto.request.ResetPasswordRequest;
import com.example.nhop_nhep_hotpot_be.dto.request.SignInForm;
import com.example.nhop_nhep_hotpot_be.dto.response.JwtResponse;
import com.example.nhop_nhep_hotpot_be.dto.response.ResponseMessage;
import com.example.nhop_nhep_hotpot_be.model.user.User;
import com.example.nhop_nhep_hotpot_be.sercurity.JwtTokenProvider;
import com.example.nhop_nhep_hotpot_be.sercurity.UserPrinciple;
import com.example.nhop_nhep_hotpot_be.service.IEmailService;
import com.example.nhop_nhep_hotpot_be.service.IUserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class AuthRestController {

    @Autowired
    private IUserService iUserService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private IEmailService iEmailService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Validated @RequestBody SignInForm signInForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> map = new LinkedHashMap<>();
            List<FieldError> err = bindingResult.getFieldErrors();
            for (FieldError error : err) {
                if (!map.containsKey(error.getField())) {
                    map.put(error.getField(), error.getDefaultMessage());
                }
            }
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        } else if (Boolean.FALSE.equals(iUserService.existsByUsername(signInForm.getUsername()))) {
            return new ResponseEntity<>(new ResponseMessage("Tên người dùng không tồn tại"), HttpStatus.BAD_REQUEST);
        } else {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signInForm.getUsername(), signInForm.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtTokenProvider.createToken(authentication);
            UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
            return ResponseEntity.ok(new JwtResponse(token, userPrinciple.getUsername(), userPrinciple.getAvatar(), userPrinciple.getAuthorities(),userPrinciple.getName()));
        }
    }


    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(HttpServletRequest request, @Validated @RequestBody ChangePasswordRequest changePasswordRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> map = new LinkedHashMap<>();
            List<FieldError> err = bindingResult.getFieldErrors();
            for (FieldError error : err) {
                if (!map.containsKey(error.getField())) {
                    map.put(error.getField(), error.getDefaultMessage());
                }
            }
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
        final String requestTokenHeader = request.getHeader("Authorization");
        String username;
        String jwtToken;
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                username = jwtTokenProvider.getUserNameFromToken(jwtToken);
            } catch (ExpiredJwtException e) {
                throw new JwtException("Mã thông báo JWT đã hết hạn", e);
            }
        } else {
            return new ResponseEntity<>(new ResponseMessage("Mã JWT không chính xác"), HttpStatus.BAD_REQUEST);
        }
        User user = iUserService.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Tên người dùng không tồn tại"));
        if (Boolean.FALSE.equals(iUserService.checkIfValidOldPassword(user, changePasswordRequest.getOldPassword()))) {
            return new ResponseEntity<>(new ResponseMessage("Mật khẩu hiện tại không đúng"), HttpStatus.BAD_REQUEST);
        }
        if (changePasswordRequest.getNewPassword().equals(changePasswordRequest.getOldPassword())) {
            return new ResponseEntity<>(new ResponseMessage("Mật khẩu mới không được trùng với mật khẩu cũ"), HttpStatus.BAD_REQUEST);
        }
        if (!changePasswordRequest.getNewPassword().equals(changePasswordRequest.getConfirmPassword())) {
            return new ResponseEntity<>(new ResponseMessage("Mật khẩu xác nhận không trùng khớp"), HttpStatus.BAD_REQUEST);
        }
        iUserService.changeUserPassword(user, changePasswordRequest.getNewPassword());
        return ResponseEntity.ok(new ResponseMessage("Đổi mật khẩu thành công!"));
    }

    @PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Validated @RequestBody ResetPasswordRequest resetPasswordRequest, BindingResult bindingResult) {
        if (!bindingResult.hasErrors()) {
            User user = iUserService.findByEmailUser(resetPasswordRequest.getEmail());
            if(user != null){
                if (!resetPasswordRequest.getNewPassword().equals(resetPasswordRequest.getConfirmPassword())) {
                    return new ResponseEntity<>(new ResponseMessage("Mật khẩu xác nhận không trùng khớp"), HttpStatus.BAD_REQUEST);
                } else {
                    iUserService.changeUserPassword(user, resetPasswordRequest.getNewPassword());
                    return ResponseEntity.ok(new ResponseMessage("Đổi mật khẩu thành công!"));
                }
            }else {
                return new ResponseEntity<>(new ResponseMessage("Không tìm thấy email"), HttpStatus.BAD_REQUEST);
            }
        } else {
            Map<String, String> map = new LinkedHashMap<>();
            List<FieldError> err = bindingResult.getFieldErrors();
            for (FieldError error : err) {
                if (!map.containsKey(error.getField())) {
                    map.put(error.getField(), error.getDefaultMessage());
                }
            }
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<?> processForgotPassword(@Validated @RequestBody MailDTO mailDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> map = new LinkedHashMap<>();
            List<FieldError> err = bindingResult.getFieldErrors();
            for (FieldError error : err) {
                if (!map.containsKey(error.getField())) {
                    map.put(error.getField(), error.getDefaultMessage());
                }
            }
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
        User user = iUserService.findByEmailUser(mailDTO.getEmail());
        if (user == null) {
            return new ResponseEntity<>(new ResponseMessage("Không tìm thấy email"), HttpStatus.BAD_REQUEST);
        }
        String otp = iEmailService.generateOtp(user);
        iEmailService.sendResetPasswordEmail(mailDTO.getEmail(), otp);
        return new ResponseEntity<>(mailDTO.getEmail(), HttpStatus.OK);
    }

    @PutMapping("/check-otp")
    public ResponseEntity<?> confirmForgotPassword(@Validated @RequestBody OtpDTO employeeOtpDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> map = new LinkedHashMap<>();
            List<FieldError> err = bindingResult.getFieldErrors();
            for (FieldError error : err) {
                if (!map.containsKey(error.getField())) {
                    map.put(error.getField(), error.getDefaultMessage());
                }
            }
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
        if (iEmailService.validateOtp(employeeOtpDTO.getCode(), employeeOtpDTO.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("Xác thực mã OTP thành công"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseMessage("Mã OTP không chính xác"), HttpStatus.BAD_REQUEST);
        }
    }
}