package com.example.nhop_nhep_hotpot_be.repository.cart;

import com.example.nhop_nhep_hotpot_be.model.CartDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ICartDetailRepository extends JpaRepository<CartDetail, Integer> {
    @Query(value = "SELECT *\n" +
            "FROM cart_detail cd\n" +
            "         JOIN cart c ON cd.cart_id = c.id\n" +
            "WHERE cd.is_delete = false AND (c.customer_name = :customerName OR c.customer_name = \"null\") ",
            nativeQuery = true)
    List<CartDetail> findAllIsDeleteFalse(@Param("customerName") String customerName);

    @Query(value = "select * from cart_detail cd join cart c on cd.cart_id = c.id " +
            "where cd.quantity > 0 and cd.is_delete = true and cd.is_delete = true " +
            "and c.customer_name=:customerName", nativeQuery = true)
    Page<CartDetail> findTotalAll(@Param("customerName") String customerName, Pageable pageable);
}