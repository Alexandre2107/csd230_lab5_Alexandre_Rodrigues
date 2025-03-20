package csd230.lab2.controllers;

import csd230.lab2.entities.Cart;
import csd230.lab2.entities.CartItem;
import csd230.lab2.repositories.CartItemRepository;
import csd230.lab2.repositories.CartRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.text.DecimalFormat;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/checkout")
public class CheckoutController {

    private final CartRepository cartRepository;
    CartItemRepository cartItemRepository;

    public CheckoutController(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @GetMapping
    public String checkout(Model model) {
        Cart cart = cartRepository.findById(1L);
        Set<CartItem> items = cart.getItems();
        model.addAttribute("items", items);
        return "checkout";
    }

    @PostMapping
    public String checkout(@RequestParam(value = "cartItemId", required = false) Long id, Model model) {
        Cart cart = cartRepository.findById(1L);
        Set<CartItem> items = cart.getItems();


        double checkoutTotal = 0.0;
        for (CartItem item : items) {
            checkoutTotal += item.getPrice();
        }

        DecimalFormat df = new DecimalFormat("#.00");
        model.addAttribute("checkoutTotal", df.format(checkoutTotal));

        List<CartItem> sortedItems = cart.getItems().stream()
                .sorted(Comparator.comparing(CartItem::getId))
                .collect(Collectors.toList());
        cart.setItems(new LinkedHashSet<>(sortedItems));
        model.addAttribute("cart", cart);

        return "checkout";
    }



}
