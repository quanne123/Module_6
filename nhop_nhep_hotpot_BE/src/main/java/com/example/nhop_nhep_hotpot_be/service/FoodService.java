package com.example.nhop_nhep_hotpot_be.service;

import com.example.nhop_nhep_hotpot_be.dto.food.FoodDTO;
import com.example.nhop_nhep_hotpot_be.dto.food.FoodImgDTO;
import com.example.nhop_nhep_hotpot_be.dto.food.FoodTypeDTO;
import com.example.nhop_nhep_hotpot_be.model.Food;
import com.example.nhop_nhep_hotpot_be.model.FoodImage;
import com.example.nhop_nhep_hotpot_be.repository.IFoodRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FoodService implements IFoodService{
@Autowired
private IFoodRepository foodRepository;

public void setValueOfFoodImgSet(Set<FoodImage> foodImg, Set<FoodImgDTO> foodImgDTOS) {
    FoodImgDTO foodImgDTO;
    for (FoodImage foodImage : foodImg) {
        foodImgDTO = new FoodImgDTO();
        BeanUtils.copyProperties(foodImage,foodImgDTO);
        foodImgDTOS.add(foodImgDTO);
    }

}
    public void copyFoodToFoodDTO (Food food, FoodDTO foodDTO){
    foodDTO.setFoodTypeDTO(new FoodTypeDTO());
    BeanUtils.copyProperties(food.getFoodType(), foodDTO.getFoodTypeDTO());
    foodDTO.setFoodImgDTOS(new TreeSet<>(Comparator.comparingInt(FoodImgDTO :: getId)));
    setValueOfFoodImgSet(food.getImageSet(),foodDTO.getFoodImgDTOS());
    BeanUtils.copyProperties(food,foodDTO);
    }


    @Override
    public Page<FoodDTO> findByName(Pageable pageable, String name) {
        Page<Food> foods = foodRepository.findFoodByNameContaining(pageable, name);
        List<FoodDTO> foodDTOS = new ArrayList<>();
        FoodDTO foodDTO;
        for (Food food : foods){
            foodDTO = new FoodDTO();
            copyFoodToFoodDTO(food,foodDTO);
            foodDTOS.add(foodDTO);
        }
        return new PageImpl<>(foodDTOS,pageable, foods.getTotalElements());
    }

    @Override
    public FoodDTO findById(Integer id) {
        Food food = foodRepository.findById(id).get();
        FoodDTO foodDTO = new FoodDTO();
        copyFoodToFoodDTO(food,foodDTO);
        return foodDTO;
    }

    @Override
    public Page<FoodDTO> findAll(Pageable pageable) {
        Page<Food> foods = foodRepository.findAll(pageable);
        List<FoodDTO> foodDTOS = new ArrayList<>();
        FoodDTO foodDTO;
        for (Food food : foods){
            foodDTO = new FoodDTO();
            copyFoodToFoodDTO(food,foodDTO);
        }
        return new PageImpl<>(foodDTOS,pageable,foods.getTotalElements());
    }
}
