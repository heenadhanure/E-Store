package com.estore.orderservice.service;

import java.util.List;

import com.estore.orderservice.enums.OrderStatus;
import com.estore.orderservice.model.Order;

public interface OrderService {
	List<Order> getAllOrders();
    List<Order> getOrdersByStatus(OrderStatus status);
    List<Order> sortOrdersByDate(boolean asc);
    List<Order> sortOrdersByAmount(boolean asc);
}
