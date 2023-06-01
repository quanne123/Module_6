package com.example.nhop_nhep_hotpot_be.model.user;


import com.example.nhop_nhep_hotpot_be.model.user.RoleName;
import com.example.nhop_nhep_hotpot_be.model.user.User;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(     )
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 60)
    private RoleName name;

    @JsonManagedReference
    @ManyToMany(mappedBy = "roles")
    Set<User> users = new HashSet<>();

    public Role() {
    }

    public Role(Integer id, RoleName name, Set<User> users) {
        this.id = id;
        this.name = name;
        this.users = users;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public RoleName getName() {
        return name;
    }

    public void setName(RoleName name) {
        this.name = name;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}
