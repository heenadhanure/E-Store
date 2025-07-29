package com.estore.repairservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.estore.repairservice.model.RepairRequest;
import com.estore.repairservice.service.RepairRequestService;

@RestController
@RequestMapping("/repairs")
public class RepairRequestController {

	@Autowired
	private RepairRequestService service;
	
	@PostMapping
	public RepairRequest submitRequest(@RequestBody RepairRequest request) {
		return service.saveRequest(request);
	}
	
	 @GetMapping("/admin")
	 public List<RepairRequest> getAllRequests() {
	    return service.getAllRequests();
	 }

	 @PutMapping("/{id}/status")
	 public RepairRequest updateStatus(@PathVariable Long id, @RequestParam String status) {
	    return service.updateStatus(id, status);
	 }
}
