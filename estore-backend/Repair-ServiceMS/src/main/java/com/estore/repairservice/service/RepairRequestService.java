package com.estore.repairservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.estore.repairservice.model.RepairRequest;
import com.estore.repairservice.repository.RepairRequestRepository;

@Service
public class RepairRequestService {
 
	@Autowired
	private RepairRequestRepository repository;
	
	public RepairRequest saveRequest(RepairRequest request) {
		return repository.save(request);
	}
	
	public List<RepairRequest> getAllRequests() {
	    return repository.findAll();
	}

	public RepairRequest updateStatus(Long id, String status) {
	    RepairRequest request = repository.findById(id).orElseThrow();
	    request.setStatus(status);
	    return repository.save(request);
	}

}
