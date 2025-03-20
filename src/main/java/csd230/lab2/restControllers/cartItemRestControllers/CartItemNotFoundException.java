package csd230.lab2.restControllers.cartItemRestControllers;

public class CartItemNotFoundException extends RuntimeException {
    CartItemNotFoundException(Long id) {
        super("Could not find cart item " + id);
    }
}