package com.estore.cartservice.service;

import com.estore.cartservice.model.CartItem;
import com.estore.cartservice.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public CartItem addToCart(CartItem item) {
        return cartRepository.save(item);
    }

    public List<CartItem> getCartByUser(String userId) {
        return cartRepository.findByUserId(userId);
    }

    public void removeItem(Long itemId) {
        cartRepository.deleteById(itemId);
    }

    public void clearCart(String userId) {
        cartRepository.deleteByUserId(userId);
    }
}
