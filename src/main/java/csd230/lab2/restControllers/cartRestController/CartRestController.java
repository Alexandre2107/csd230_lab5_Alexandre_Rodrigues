package csd230.lab2.restControllers.cartRestController;

import csd230.lab2.entities.Cart;
import csd230.lab2.entities.CartItem;
import csd230.lab2.repositories.CartItemRepository;
import csd230.lab2.repositories.CartRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rest/cart")
public class CartRestController {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    public CartRestController(CartRepository cartRepository, CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
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

    @PostMapping("/remove/{cartItemId}")
    public Cart removeItemFromCart(@PathVariable Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("CartItem not found"));

        Cart cart = cartItem.getCart();
        System.out.println("CartItem ID: " + cartItem.getId() + ", Cart: " + cart);
        if (cart != null) {
            cartItem.setCart(null);
            cart.removeItem(cartItem);
            cartItemRepository.save(cartItem);
            cartRepository.save(cart);
        }
        return cart;
    }

    @DeleteMapping("/delete/{cartId}")
    public void deleteCart(@PathVariable Long cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));
        cartRepository.delete(cart);
    }
}