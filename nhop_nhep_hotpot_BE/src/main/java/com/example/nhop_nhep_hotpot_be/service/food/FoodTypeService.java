package com.example.nhop_nhep_hotpot_be.service.food;

import com.example.nhop_nhep_hotpot_be.model.FoodType;
import com.example.nhop_nhep_hotpot_be.repository.food.IFoodTypeRepository;
import com.example.nhop_nhep_hotpot_be.service.IFoodTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodTypeService implements IFoodTypeService {
@Autowired
    private IFoodTypeRepository foodTypeRepository;

    @Override
    public List<FoodType> ListFoodType() {
        return foodTypeRepository.ListFoodType();
    }
}
