package com.example.nhop_nhep_hotpot_be.repository;

import com.example.nhop_nhep_hotpot_be.model.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IFoodRepository extends JpaRepository<Food, Integer> {
Page<Food> findFoodByNameContaining(Pageable pageable, String name);

}
