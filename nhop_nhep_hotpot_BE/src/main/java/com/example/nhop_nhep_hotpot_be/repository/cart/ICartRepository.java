package com.example.nhop_nhep_hotpot_be.repository.cart;

import com.example.nhop_nhep_hotpot_be.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ICartRepository extends JpaRepository<Cart, Integer> {
    @Query(value = "select * from cart order by id desc LIMIT 1",nativeQuery = true )
    Cart findTheLastCart();

    Cart findByCodeContaining(String code);
}
