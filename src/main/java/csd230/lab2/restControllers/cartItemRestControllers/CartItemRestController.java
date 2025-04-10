package csd230.lab2.restControllers.cartItemRestControllers;

import csd230.lab2.entities.Cart;
import csd230.lab2.entities.CartItem;
import csd230.lab2.repositories.CartItemRepository;
import csd230.lab2.repositories.CartRepository;
import csd230.lab2.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rest/cartItem")
public class CartItemRestController {
    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;

    public CartItemRestController(CartItemRepository cartItemRepository, CartRepository cartRepository) {
        this.cartItemRepository = cartItemRepository;
        this.cartRepository = cartRepository;
    }

    @GetMapping()
    List<CartItem> all() {
        return cartItemRepository.findAll();
    }

    @GetMapping("/cart/{cartId}")
    public List<CartItem> getCartItemsByCartId(@PathVariable Long cartId) {
        return cartItemRepository.findByCartId(cartId);
    }

    @GetMapping("/{id}")
    public CartItem getCartItem(@PathVariable Long id) {
        return cartItemRepository.findById(id)
                .orElseThrow(() -> new CartItemNotFoundException(id));
    }

    @PostMapping()
    public CartItem newCartItem(@RequestBody CartItem newCartItem, @RequestParam Long cartId) {
        if (newCartItem.getDescription() == null || newCartItem.getDescription().isEmpty()) {
            throw new RuntimeException("Description is required for CartItem");
        }
        if (newCartItem.getPrice() <= 0) {
            throw new RuntimeException("Price must be greater than 0");
        }
        if (newCartItem.getQuantity() <= 0) {
            throw new RuntimeException("Quantity must be greater than 0");
        }

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        newCartItem.setCart(cart);
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