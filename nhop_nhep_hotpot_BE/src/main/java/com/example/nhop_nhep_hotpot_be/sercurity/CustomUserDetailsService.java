package com.example.nhop_nhep_hotpot_be.sercurity;



import com.example.nhop_nhep_hotpot_be.model.user.User;
import com.example.nhop_nhep_hotpot_be.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private IUserRepository iUserRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user  = iUserRepository.findByUserName(username).orElseThrow(()-> new UsernameNotFoundException("Không tìm thấy tên người dùng"+username));
        return UserPrinciple.build(user);
    }

}