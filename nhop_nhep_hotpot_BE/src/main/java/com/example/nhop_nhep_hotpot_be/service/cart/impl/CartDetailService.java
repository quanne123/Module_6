package com.example.nhop_nhep_hotpot_be.service.cart.impl;

import com.example.nhop_nhep_hotpot_be.dto.cart.CartDTO;
import com.example.nhop_nhep_hotpot_be.dto.cart.CartDetailDTO;
import com.example.nhop_nhep_hotpot_be.model.Cart;
import com.example.nhop_nhep_hotpot_be.model.CartDetail;
import com.example.nhop_nhep_hotpot_be.model.Food;
import com.example.nhop_nhep_hotpot_be.repository.IFoodRepository;
import com.example.nhop_nhep_hotpot_be.repository.cart.ICartDetailRepository;
import com.example.nhop_nhep_hotpot_be.repository.cart.ICartRepository;
import com.example.nhop_nhep_hotpot_be.service.IFoodService;
import com.example.nhop_nhep_hotpot_be.service.cart.ICartDetailService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class CartDetailService implements ICartDetailService {
    @Autowired
    private ICartDetailRepository cartDetailRepository;
    @Autowired
    private ICartRepository cartRepository;

    @Autowired
    private IFoodService foodService;

    @Autowired
    private IFoodRepository foodRepository;
    Integer count = 0;
    public void resetCount(){
        count = 0;
    }

    @Override
    public String save(CartDetailDTO cartDetailDTO) {
        Food food = foodRepository.findById(cartDetailDTO.getFoodDTO().getId()).get();
        if (food.getQuantity() < cartDetailDTO.getQuantity()){
            return "Không đủ số lượng";
        }
        if (count == 0 ){
            Cart cart = new Cart();
            cartRepository.save(cart);
        }
        CartDetail cartDetail = new CartDetail();
        cartDetail.setFood(new Food());
        BeanUtils.copyProperties(cartDetailDTO.getFoodDTO(),cartDetail.getFood());
        BeanUtils.copyProperties(cartDetailDTO,cartDetail);
        cartDetail.setCart(cartRepository.findTheLastCart());
        if (food.getQuantity() - cartDetail.getQuantity() < 0) {
            return "Không đủ số lượng";
        }
    food.setQuantity(food.getQuantity() - cartDetail.getQuantity());
        foodRepository.save(food);
        List<CartDetail> cartDetails = cartDetailRepository.findAll();
        if (cartDetails.isEmpty()){
            cartDetailRepository.save(cartDetail);
            count ++;
            return "";
        }
        for (int i = cartDetails.size() -1 ; i >= 0  ; i-- ) {
            if (count != 0 && cartDetails.get(i).getFood().equals(food) && !cartDetails.get(i).isDelete()){
                cartDetails.get(i).setQuantity(cartDetails.get(i).getQuantity() + cartDetailDTO.getQuantity());
                cartDetailRepository.save(cartDetails.get(i));
                return "";
            }

        }
        cartDetailRepository.save(cartDetail);
        count ++;
        return "";
    }

    @Override
    public String update(Integer id, Integer quantity) {
        CartDetail cartDetail = cartDetailRepository.findById(id).get();
        Food food = foodRepository.findById(cartDetail.getFood().getId()).get();
        if (food.getQuantity() < quantity){
            return "Khong du so luong";
        }
        cartDetail.setQuantity(cartDetail.getQuantity() + quantity);
        cartDetailRepository.save(cartDetail);
        return "";
    }

    @Override
    public void delete(int id) {
    CartDetail cartDetail = cartDetailRepository.findById(id).get();
    cartDetail.setDelete(true);
    Food food = foodRepository.findById(cartDetail.getFood().getId()).get();
    food.setQuantity(food.getQuantity() + cartDetail.getQuantity());
    foodRepository.save(food);
    cartDetailRepository.save(cartDetail);
    }

    @Override
    public List<CartDetailDTO> findAll() {
        List<CartDetail> cartDetails = cartDetailRepository.findALlIsDeleteFalse();
        List<CartDetailDTO> cartDetailDTOS = new ArrayList<>();
        CartDetailDTO cartDetailDTO;
        for (CartDetail cartDetail : cartDetails){
            cartDetailDTO = new CartDetailDTO();
            cartDetailDTO.setFoodDTO(foodService.findById(cartDetail.getFood().getId()));
            BeanUtils.copyProperties(cartDetail, cartDetailDTO);
            cartDetailDTOS.add(cartDetailDTO);
        }
        return cartDetailDTOS;
    }

    @Override
    public void deleteAll(int id) {
        List<CartDetail> cartDetails = cartDetailRepository.findAll();
        for (int i = cartDetails.size() -1; i>= 0; i--){
            if (cartDetails.get(i).getCart().getId() == id){
                cartDetails.get(i).setDelete(true);
                cartDetailRepository.save(cartDetails.get(i));
            }
        }
    }

    @Override
    public Page<CartDetailDTO> findTotalAll(String customerName, Pageable pageable) {
        Page<CartDetail> cartDetails = cartDetailRepository.findTotalAll(customerName,pageable);
        List<CartDetailDTO> cartDetailDTOS = new ArrayList<>();
        CartDetailDTO cartDetailDTO;
        for (CartDetail cartDetail : cartDetails){
            cartDetailDTO = new CartDetailDTO();
            cartDetailDTO.setCartDTO(new CartDTO());
            BeanUtils.copyProperties(cartDetail,cartDetailDTO);
            cartDetailDTOS.add(cartDetailDTO);
        }
        return new PageImpl<>(cartDetailDTOS, pageable,cartDetails.getTotalElements());
    }
}
