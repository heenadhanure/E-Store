package com.estore.productservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.estore.productservice.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
