package com.estore.com.admin.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name="order-servicems")
public interface OrderClient {
	@GetMapping("/orders/count")
	Long getOrderCount();
	
	@GetMapping("/orders/total-revenue")
	Double getTotalRevenue();
}
