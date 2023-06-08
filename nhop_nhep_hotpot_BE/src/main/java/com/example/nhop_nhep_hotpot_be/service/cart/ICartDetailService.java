package com.example.nhop_nhep_hotpot_be.service.cart;

import com.example.nhop_nhep_hotpot_be.dto.cart.CartDetailDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICartDetailService {
    String save(CartDetailDTO cartDetailDTO,String customerName);

    String update(Integer id,Integer quantity);

    void delete(int id);

    List<CartDetailDTO> findAll(String customerName);

    void deleteAll(int id);

    Page<CartDetailDTO> findTotalAll(String customerName, Pageable pageable);

}
