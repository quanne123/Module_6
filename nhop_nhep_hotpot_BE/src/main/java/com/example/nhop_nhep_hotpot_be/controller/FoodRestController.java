package com.example.nhop_nhep_hotpot_be.controller;

import com.example.nhop_nhep_hotpot_be.dto.food.FoodDTO;
import com.example.nhop_nhep_hotpot_be.service.IFoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/food")
@CrossOrigin("*")
public class FoodRestController {
    @Autowired
    private IFoodService foodService;

    @GetMapping("")
    public ResponseEntity<Page<FoodDTO>> findProductByName(
            @RequestParam(required = false, defaultValue = "") String name,
            @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC, size = 6) Pageable pageable) {
        Page<FoodDTO> foodDTOs = foodService.findByName(pageable, name);
        if (foodDTOs.isEmpty()) {
            return new ResponseEntity<>(foodDTOs, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(foodDTOs, HttpStatus.OK);

    }

    @GetMapping("/list")
    public ResponseEntity<Page<FoodDTO>> findAll(
            @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC, size = 3) Pageable pageable) {
        Page<FoodDTO> foodDTOS = foodService.findAll(pageable);
        if (foodDTOS.isEmpty()) {
            return new ResponseEntity<>(foodDTOS, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(foodDTOS, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<FoodDTO> findById(@PathVariable Integer id) {
        FoodDTO foodDTO = foodService.findById(id);
        if (foodDTO == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(foodDTO, HttpStatus.OK);
    }
}


