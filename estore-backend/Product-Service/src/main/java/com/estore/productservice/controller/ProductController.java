package com.estore.productservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.estore.productservice.model.Product;
import com.estore.productservice.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins="*")
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@GetMapping
	public List<Product> getAll(){
		return productService.getAllProducts();
	}
	
	@GetMapping("/{id}")
	public Product getById(@PathVariable Long id) {
		return productService.getProductById(id);
	}
	
	@GetMapping("/category/{category}")
	public List<Product> getByCategory(@PathVariable String category){
		return productService.getProductsByCategory(category);
	}
}
