package com.estore.com.admin.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.estore.com.admin.client.OrderClient;
import com.estore.com.admin.client.ProductClient;
import com.estore.com.admin.client.UserClient;

@Service
public class AdminService {

    @Autowired
    private ProductClient productClient;

    @Autowired
    private OrderClient orderClient;

    @Autowired
    private UserClient userClient;

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalProducts", productClient.getProductCount());
        stats.put("totalOrders", orderClient.getOrderCount());
        stats.put("totalUsers", userClient.getUserCount());
        stats.put("totalRevenue", orderClient.getTotalRevenue());
        return stats;
    }
}
