package csd230.lab2.restControllers.cartItemRestControllers;

import csd230.lab2.entities.CartItem;
import csd230.lab2.repositories.CartItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rest/cartItem")
public class CartItemRestController {
    private final CartItemRepository cartItemRepository;

    public CartItemRestController(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    @GetMapping()
    List<CartItem> all() {
        return cartItemRepository.findAll();
    }

    @GetMapping("/{id}")
    public CartItem getCartItem(@PathVariable Long id) {
        return cartItemRepository.findById(id)
                .orElseThrow(() -> new CartItemNotFoundException(id));
    }

    @PostMapping()
    CartItem newCartItem(@RequestBody CartItem newCartItem) {
        return cartItemRepository.save(newCartItem);
    }

    @PutMapping("/{id}")
    CartItem replaceCartItem(@RequestBody CartItem newCartItem, @PathVariable Long id) {
        return cartItemRepository.findById(id)
                .map(cartItem -> {
                    cartItem.setPrice(newCartItem.getPrice());
                    cartItem.setQuantity(newCartItem.getQuantity());
                    cartItem.setDescription(newCartItem.getDescription());
                    cartItem.setCart(newCartItem.getCart());
                    return cartItemRepository.save(cartItem);
                })
                .orElseGet(() -> {
                    newCartItem.setId(id);
                    return cartItemRepository.save(newCartItem);
                });
    }

    @DeleteMapping("/{id}")
    void deleteCartItem(@PathVariable Long id) {
        cartItemRepository.deleteById(id);
    }
}