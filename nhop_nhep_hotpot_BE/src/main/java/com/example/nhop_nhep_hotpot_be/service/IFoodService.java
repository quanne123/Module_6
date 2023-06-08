package com.example.nhop_nhep_hotpot_be.service;

import com.example.nhop_nhep_hotpot_be.dto.food.FoodDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IFoodService {
    Page<FoodDTO> findByName(Pageable pageable,String name);

    FoodDTO findById (Integer id);

    Page<FoodDTO> findAll(Pageable pageable);
    Page<FoodDTO> findWithFoodType(Integer foodTypeId, Pageable pageable );
}
