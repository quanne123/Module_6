package com.example.nhop_nhep_hotpot_be.service.user;

import com.example.nhop_nhep_hotpot_be.model.user.Role;
import com.example.nhop_nhep_hotpot_be.repository.user.IRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService implements IRoleService {
    @Autowired
    private IRoleRepository roleRepository;
    @Override
    public Optional<Role> findByName(String name) {
        return roleRepository.findWithName(name);
    }
}

