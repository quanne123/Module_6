package com.example.nhop_nhep_hotpot_be.dto.cart;

import com.example.nhop_nhep_hotpot_be.dto.food.FoodDTO;

import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

public class CartDetailDTO {

    private Integer id;
    @PositiveOrZero(message = "Tổng tiền phải là số dương")
    private Double total;
    @Positive(message = "Hãy chọn số lượng (ít nhất 1 sản phẩm)")
    private Integer quantity;
    private FoodDTO foodDTO;
    private CartDTO cartDTO;

    public CartDetailDTO() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public FoodDTO getFoodDTO() {
        return foodDTO;
    }

    public void setFoodDTO(FoodDTO foodDTO) {
        this.foodDTO = foodDTO;
    }

    public CartDTO getCartDTO() {
        return cartDTO;
    }

    public void setCartDTO(CartDTO cartDTO) {
        this.cartDTO = cartDTO;
    }
}

