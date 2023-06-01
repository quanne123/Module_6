package com.example.nhop_nhep_hotpot_be.service.cart.impl;

import com.example.nhop_nhep_hotpot_be.dto.cart.CartDTO;
import com.example.nhop_nhep_hotpot_be.model.Cart;
import com.example.nhop_nhep_hotpot_be.repository.cart.ICartDetailRepository;
import com.example.nhop_nhep_hotpot_be.repository.cart.ICartRepository;
import com.example.nhop_nhep_hotpot_be.service.cart.ICartService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService implements ICartService {
@Autowired
private ICartRepository cartRepository;
@Autowired
private ICartDetailRepository cartDetailRepository;

    @Override
    public void update(CartDTO cartDTO) {
        Cart cart = cartRepository.findTheLastCart();
        cartDTO.setId(cart.getId());
        BeanUtils.copyProperties(cartDTO,cart);
        cart.setDelete(true);

    }
}
