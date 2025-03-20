package csd230.lab2.restControllers.cartRestController;

import csd230.lab2.entities.Cart;
import csd230.lab2.repositories.CartRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rest/cart")
public class CartRestController {
    private final CartRepository cartRepository;

    public CartRestController(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @GetMapping()
    List<Cart> all() {
        return cartRepository.findAll();
    }

    @GetMapping("/{id}")
    public Cart getCart(@PathVariable Long id) {
        return cartRepository.findById(id)
                .orElseThrow(() -> new CartNotFoundException(id));
    }

    @PostMapping()
    Cart newCart(@RequestBody Cart newCart) {
        return cartRepository.save(newCart);
    }

    @PutMapping("/{id}")
    Cart replaceCart(@RequestBody Cart newCart, @PathVariable Long id) {
        return cartRepository.findById(id)
                .map(cart -> {
                    cart.setItems(newCart.getItems());
                    return cartRepository.save(cart);
                })
                .orElseGet(() -> {
                    newCart.setId(id);
                    return cartRepository.save(newCart);
                });
    }

    @DeleteMapping("/{id}")
    void deleteCart(@PathVariable Long id) {
        cartRepository.deleteById(id);
    }
}