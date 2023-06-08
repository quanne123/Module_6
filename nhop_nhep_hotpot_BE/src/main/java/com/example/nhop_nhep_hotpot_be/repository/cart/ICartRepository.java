package com.example.nhop_nhep_hotpot_be.repository.cart;

import com.example.nhop_nhep_hotpot_be.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ICartRepository extends JpaRepository<Cart, Integer> {
    @Query(value = "SELECT * FROM cart ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Cart findTheLastCart();
    @Query(value = "SELECT * FROM cart WHERE is_delete = false AND customer_name=:customerName", nativeQuery = true)
    Cart findWithCustomerNameAndIsDelete(@Param("customerName") String customerName);

    @Query(value = "SELECT * FROM cart WHERE is_delete = false AND customer_name = \"null\"", nativeQuery = true)
    Cart findWithNull();
}
