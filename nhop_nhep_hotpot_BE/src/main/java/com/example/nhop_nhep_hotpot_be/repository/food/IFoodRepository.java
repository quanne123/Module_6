package com.example.nhop_nhep_hotpot_be.repository.food;

import com.example.nhop_nhep_hotpot_be.model.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IFoodRepository extends JpaRepository<Food, Integer> {
Page<Food> findFoodByNameContaining(Pageable pageable, String name);
@Query(value = "select * from food where food_type_id = :foodTypeId",nativeQuery = true)
    Page<Food> searchWithType(@Param("foodTypeId") Integer foodTypeId, Pageable pageable );
}
