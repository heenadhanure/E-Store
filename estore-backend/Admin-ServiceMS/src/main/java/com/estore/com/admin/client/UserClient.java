package com.estore.com.admin.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name="user-servicems")
public interface UserClient {
	@GetMapping("/users/count")
	Long getUserCount();
}
