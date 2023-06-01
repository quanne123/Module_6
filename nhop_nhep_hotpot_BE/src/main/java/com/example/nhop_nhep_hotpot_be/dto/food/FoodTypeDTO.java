package com.example.nhop_nhep_hotpot_be.dto.food;

import java.util.Set;

public class FoodTypeDTO {

    private Integer id;
    private String name;
    private Set<FoodDTO> foodDTOS;

    public FoodTypeDTO() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<FoodDTO> getFoodDTOS() {
        return foodDTOS;
    }

    public void setFoodDTOS(Set<FoodDTO> foodDTOS) {
        this.foodDTOS = foodDTOS;
    }
}

