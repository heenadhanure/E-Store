package com.estore.productservice.service;

import java.util.List;
import com.estore.productservice.model.Product;

public interface ProductService {
	List<Product> getAllProducts();
	Product getProductById(Long id);
}
