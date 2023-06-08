package com.example.nhop_nhep_hotpot_be.service.cart.impl;

import com.example.nhop_nhep_hotpot_be.dto.cart.CartDTO;
import com.example.nhop_nhep_hotpot_be.model.Cart;
import com.example.nhop_nhep_hotpot_be.model.CartDetail;
import com.example.nhop_nhep_hotpot_be.model.Food;
import com.example.nhop_nhep_hotpot_be.repository.cart.ICartDetailRepository;
import com.example.nhop_nhep_hotpot_be.repository.cart.ICartRepository;
import com.example.nhop_nhep_hotpot_be.repository.food.IFoodRepository;
import com.example.nhop_nhep_hotpot_be.service.cart.ICartDetailService;
import com.example.nhop_nhep_hotpot_be.service.cart.ICartService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class CartService implements ICartService {
    @Autowired
    private ICartRepository cartRepository;
    @Autowired
    private ICartDetailService cartDetailService;
    @Autowired
    private ICartDetailRepository cartDetailRepository;
    @Autowired
    private IFoodRepository foodRepository;


    @Override
    public void update(CartDTO cartDTO) {
        Cart cart = cartRepository.findWithCustomerNameAndIsDelete(cartDTO.getCustomerName());
        if (cart == null) {
            cart = cartRepository.findWithNull();
        }
        cartDTO.setId(cart.getId());
        BeanUtils.copyProperties(cartDTO, cart);
        cart.setDelete(true);
        cartDetailService.deleteAll(cart.getId());
        cartRepository.save(cart);
    }
    @Override
    public void deletePermanent(Integer id) {
        Cart cart = cartRepository.findById(id).get();
        List<CartDetail> cartDetailList = cartDetailRepository.findAll();
        for (int i = cartDetailList.size() - 1; i >= 0; i--) {
            if (Objects.equals(cartDetailList.get(i).getCart().getId(), cart.getId())) {
                Food food = foodRepository.findById(cartDetailList.get(i).getFood().getId()).get();
                food.setQuantity(cartDetailList.get(i).getQuantity() + food.getQuantity());
                foodRepository.save(food);
                cartDetailRepository.delete(cartDetailList.get(i));

            }
        }
        cartRepository.delete(cart);
    }
}
