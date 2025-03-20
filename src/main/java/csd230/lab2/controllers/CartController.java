package csd230.lab2.controllers;

import csd230.lab2.entities.Cart;
import csd230.lab2.entities.CartItem;
import csd230.lab2.repositories.CartItemRepository;
import csd230.lab2.repositories.CartRepository;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/cart")
public class CartController {

    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;

    public CartController(CartRepository cartRepository, CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @GetMapping
    public String cart(Model model) {
        Iterable<Cart> allCarts = cartRepository.findAll();
        Cart firstCart = allCarts.iterator().next();
        List<CartItem> sortedItems = firstCart.getItems().stream()
                .sorted(Comparator.comparing(CartItem::getId))
                .collect(Collectors.toList());
        firstCart.setItems(new LinkedHashSet<>(sortedItems));
        model.addAttribute("cart", firstCart);
        return "cart";
    }

    @GetMapping("/add-cart")
    public String cartForm(Model model) {
        model.addAttribute("cart", new Cart());
        return "add-cart";
    }

    @PostMapping("/add-cart")
    public String cartSubmit(@RequestParam("selectedItems") List<Long> selectedItemIds, Model model) {
        for (Long id : selectedItemIds) {
            CartItem item = cartItemRepository.findById(id).orElse(null);
            if (item != null) {
                Cart cart = cartRepository.findById(1L); // Assuming a single cart for simplicity
                cart.addItem(item);
                cartRepository.save(cart);
            }
        }
        return "redirect:/cart";
    }

    @PostMapping("/remove-cart")
    public String removeItemFromCart(@RequestParam("cartItemId") Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId).orElse(null);
        cartItem.setCart(null);
        cartItemRepository.save(cartItem);
        return "redirect:/cart";
    }

    @PostMapping("/selection")
    public String processSelection(@RequestParam("selectedCarts") List<Integer> selectedCartIds) {
        for (Integer id : selectedCartIds) {
            Cart cart = cartRepository.findById(id);
            cartRepository.delete(cart);
        }
        return "redirect:/cart";
    }
}