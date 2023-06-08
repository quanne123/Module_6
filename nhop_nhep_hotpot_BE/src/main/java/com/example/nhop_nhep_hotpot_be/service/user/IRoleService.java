package com.example.nhop_nhep_hotpot_be.service.user;

import com.example.nhop_nhep_hotpot_be.model.user.Role;

import java.util.Optional;

public interface IRoleService {
    Optional<Role> findByName (String name);
}