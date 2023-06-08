package com.example.nhop_nhep_hotpot_be.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

import java.util.Set;

@Entity
@Table(name = "food")
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private double price;

    @Column(name = "description", columnDefinition = "text")
    private String description;

    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "food_type_id")
    private FoodType foodType;

    @OneToMany(mappedBy = "food")
    @JsonManagedReference
    private Set<FoodImage> foodImageSet ;

    @JsonBackReference
    @OneToMany(mappedBy = "food")
    private Set<CartDetail> oderDetails;

    public Food() {
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
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

    public FoodType getFoodType() {
        return foodType;
    }

    public void setFoodType(FoodType foodType) {
        this.foodType = foodType;
    }

    public Set<FoodImage> getFoodImageSet() {
        return foodImageSet;
    }

    public void setFoodImageSet(Set<FoodImage> foodImageSet) {
        this.foodImageSet = foodImageSet;
    }

    public Set<CartDetail> getOderDetails() {
        return oderDetails;
    }

    public void setOderDetails(Set<CartDetail> oderDetails) {
        this.oderDetails = oderDetails;
    }
}
