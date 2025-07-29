package com.estore.orderservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.estore.orderservice.enums.OrderStatus;
import com.estore.orderservice.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(String userId);

    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.paymentStatus = 'PAID'")
    Double getTotalRevenue();
    
    List<Order> findByOrderStatus(OrderStatus status);
    
    @Query("SELECT o FROM Order o ORDER BY o.orderDate ASC")
    List<Order> findAllOrderByDateAsc();
    
    @Query("SELECT o FROM Order o ORDER BY o.orderDate DESC")
    List<Order> findAllOrderByDateDesc();
    
    @Query("SELECT o FROM Order o ORDER BY o.totalAmount ASC")
    List<Order> findAllOrderByAmountAsc();
    
    @Query("SELECT o FROM Order o ORDER BY o.totalAmount DESC")
    List<Order> findAllOrderByAmountDesc();
}
