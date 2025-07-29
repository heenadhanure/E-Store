package com.estore.cartservice.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;      // store the productId for reference

    private String productName;  // For fast display without additional joins
    private String imageUrl;     // To show product image in cart
    private double price;        // Unit price at the time it was added to cart

    private String userId;

    private int quantity;

    public double getTotalPrice() {
        return this.price * this.quantity;
    }
}
