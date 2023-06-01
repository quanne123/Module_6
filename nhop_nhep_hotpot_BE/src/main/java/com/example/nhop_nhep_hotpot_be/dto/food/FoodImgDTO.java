package com.example.nhop_nhep_hotpot_be.dto.food;

import java.util.Set;

public class FoodImgDTO {
private Integer id;
private String url;
private FoodDTO foodDTO;

    public FoodImgDTO() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public FoodDTO getFoodDTO() {
        return foodDTO;
    }

    public void setFoodDTO(FoodDTO foodDTO) {
        this.foodDTO = foodDTO;
    }
}
