package com.example.nhop_nhep_hotpot_be.repository.food;

import com.example.nhop_nhep_hotpot_be.model.FoodType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IFoodTypeRepository extends JpaRepository<FoodType, Integer> {
        FoodType findByNameContaining(String name);

        @Query(value = "select * from food_type",nativeQuery = true)
        List<FoodType> ListFoodType();
}
