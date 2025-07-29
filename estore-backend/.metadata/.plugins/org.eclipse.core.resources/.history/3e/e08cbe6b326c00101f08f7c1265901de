package com.estore.orderservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.estore.orderservice.enums.OrderStatus;
import com.estore.orderservice.model.Order;
import com.estore.orderservice.repository.OrderRepository;
import com.estore.orderservice.service.OrderServiceImpl;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderServiceImpl orderService;

    @Autowired
    private OrderRepository orderRepository;
    
    @PostMapping		// Place new order
    public ResponseEntity<Order> placeOrder(@RequestBody Order order) {
    	Order saveOrder = orderRepository.save(order);
    	System.out.println("Selected Payment Method: " + order.getPaymentMethod());
    	return ResponseEntity.ok(saveOrder);
    }

    @GetMapping("/user/{userId}")	// View past orders of customer
    public List<Order> getOrdersByUser(@PathVariable String userId) {
        return orderService.getOrdersByUser(userId);
    }

    @GetMapping("/{orderId}")	// View single order details to customer
    public Order getOrderById(@PathVariable Long orderId) {
        return orderService.getOrderById(orderId);
    }

    @GetMapping		// View all orders to admin
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/count")	// show the count of no. of orders to admin
    public Long getOrderCount() {
        return orderService.getOrderCount();
    }

    @GetMapping("/total-revenue")
    public Double getTotalRevenue() {
        return orderService.getTotalRevenue();
    }
    
    @GetMapping("/status/{status}")		
    public List<Order> getOrdersByStatus(@PathVariable("status") OrderStatus status) {
        return orderService.getOrdersByStatus(status);  
    }
    
	/*
	 * @GetMapping("/sort/date") public List<Order> sortByDate(@RequestParam boolean
	 * asc) { return orderService.sortOrdersByDate(asc); }
	 * 
	 * @GetMapping("/sort/amount") public List<Order> sortByAmount(@RequestParam
	 * boolean asc) { return orderService.sortOrdersByAmount(asc); }
	 */

    @PutMapping("/{orderId}/status")	// Change order status
    public Order updateOrderStatus(@PathVariable Long orderId, @RequestParam String status) {
        return orderService.updateStatus(orderId, status);
    }
}

