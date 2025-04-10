package csd230.lab2.restControllers.discMagRestControllers;

import csd230.lab2.entities.CartItem;
import csd230.lab2.entities.DiscMag;
import csd230.lab2.repositories.CartItemRepository;
import csd230.lab2.repositories.DiscMagRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rest/discMag")
public class DiscMagRestController {
    private final DiscMagRepository discMagRepository;
    private final CartItemRepository cartItemRepository;

    public DiscMagRestController(DiscMagRepository discMagRepository, CartItemRepository cartItemRepository) {
        this.discMagRepository = discMagRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @GetMapping()
    List<DiscMag> all() {
        return discMagRepository.findAll();
    }

    @GetMapping("/{id}")
    public DiscMag getDiscMag(@PathVariable Long id) {
        return discMagRepository.findById(id)
                .orElseThrow(() -> new DiscMagNotFoundException(id));
    }

    @PostMapping()
    DiscMag newDiscMag(@RequestBody DiscMag newDiscMag) {
        newDiscMag.setDescription("DiscMag: " + newDiscMag.getTitle());
        return discMagRepository.save(newDiscMag);
    }

    @PutMapping("/{id}")
    DiscMag replaceDiscMag(@RequestBody DiscMag newDiscMag, @PathVariable Long id) {
        return discMagRepository.findById(id)
                .map(discMag -> {
                    // Update DiscMag details
                    discMag.setHasDisc(newDiscMag.getHasDisc());
                    discMag.setTitle(newDiscMag.getTitle());
                    discMag.setPrice(newDiscMag.getPrice());
                    discMag.setDescription("DiscMag: " + newDiscMag.getTitle());

                    // Update associated CartItems
                    List<CartItem> cartItems = cartItemRepository.findByDescription(discMag.getTitle());
                    for (CartItem cartItem : cartItems) {
                        cartItem.setDescription(newDiscMag.getTitle());
                        cartItem.setPrice(newDiscMag.getPrice());
                        cartItemRepository.save(cartItem);
                    }

                    return discMagRepository.save(discMag);
                })
                .orElseGet(() -> {
                    newDiscMag.setId(id);
                    newDiscMag.setDescription("DiscMag: " + newDiscMag.getTitle());
                    return discMagRepository.save(newDiscMag);
                });
    }

    @DeleteMapping("/{id}")
    void deleteDiscMag(@PathVariable Long id) {
        DiscMag discMag = discMagRepository .findById(id)
                .orElseThrow(() -> new DiscMagNotFoundException(id));
        List<CartItem> cartItems = cartItemRepository.findByDescription(discMag.getDescription());
        cartItemRepository.deleteAll(cartItems);
        discMagRepository.deleteById(id);
    }

}