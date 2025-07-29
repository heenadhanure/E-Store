package com.estore.repairservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.estore.repairservice.model.RepairRequest;

public interface RepairRequestRepository extends JpaRepository<RepairRequest, Long> {

}
