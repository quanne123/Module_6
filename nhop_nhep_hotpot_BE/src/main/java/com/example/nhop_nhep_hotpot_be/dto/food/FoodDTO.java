package com.example.nhop_nhep_hotpot_be.dto.food;

import com.example.nhop_nhep_hotpot_be.dto.cart.CartDetailDTO;

import java.util.Set;

public class FoodDTO {
    private Integer id;
    private String name;
    private Double price;
    private String description;
    private Integer quantity;
    private FoodTypeDTO foodTypeDTO;

    private Set<FoodImgDTO> foodImgDTOS;

    private Set<CartDetailDTO> cartDetailDTOS;

    public FoodDTO() {
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public FoodTypeDTO getFoodTypeDTO() {
        return foodTypeDTO;
    }

    public void setFoodTypeDTO(FoodTypeDTO foodTypeDTO) {
        this.foodTypeDTO = foodTypeDTO;
    }

    public Set<FoodImgDTO> getFoodImgDTOS() {
        return foodImgDTOS;
    }

    public void setFoodImgDTOS(Set<FoodImgDTO> foodImgDTOS) {
        this.foodImgDTOS = foodImgDTOS;
    }

    public Set<CartDetailDTO> getCartDetailDTOS() {
        return cartDetailDTOS;
    }

    public void setCartDetailDTOS(Set<CartDetailDTO> cartDetailDTOS) {
        this.cartDetailDTOS = cartDetailDTOS;
    }
}
