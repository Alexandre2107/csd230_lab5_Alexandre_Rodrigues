package csd230.lab2.restControllers.cartRestController;

public class CartNotFoundException extends RuntimeException {
    CartNotFoundException(Long id) {
        super("Could not find cart " + id);
    }
}