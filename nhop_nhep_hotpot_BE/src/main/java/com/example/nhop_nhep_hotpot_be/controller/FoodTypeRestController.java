package com.example.nhop_nhep_hotpot_be.controller;

import com.example.nhop_nhep_hotpot_be.model.FoodType;
import com.example.nhop_nhep_hotpot_be.service.IFoodTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RequestMapping("/foodType")
@RestController
public class FoodTypeRestController {
    @Autowired
    private IFoodTypeService foodTypeService;

    @GetMapping("")
    public ResponseEntity<List<FoodType>> getAllProductType(){
        List<FoodType> foodTypes = foodTypeService.ListFoodType();
        if (foodTypes.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(foodTypes,HttpStatus.OK);
    }
}
