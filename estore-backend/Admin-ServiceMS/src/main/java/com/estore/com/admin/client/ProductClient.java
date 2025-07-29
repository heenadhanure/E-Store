package com.estore.com.admin.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name="product-service")
public interface ProductClient {
	@GetMapping("/products/count")
	Long getProductCount();
}
