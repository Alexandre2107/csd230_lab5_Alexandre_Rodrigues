package csd230.lab2.restControllers.magazineRestControllers;

import csd230.lab2.entities.CartItem;
import csd230.lab2.entities.Magazine;
import csd230.lab2.repositories.CartItemRepository;
import csd230.lab2.repositories.MagazineRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rest/magazine")
public class MagazineRestController {
    private final MagazineRepository magazineRepository;
    private final CartItemRepository cartItemRepository;

    public MagazineRestController(MagazineRepository magazineRepository, CartItemRepository cartItemRepository) {
        this.magazineRepository = magazineRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @GetMapping()
    List<Magazine> all() {
        return magazineRepository.findAll();
    }

    @GetMapping("/{id}")
    public Magazine getMagazine(@PathVariable Long id) {
        return magazineRepository.findById(id)
                .orElseThrow(() -> new MagazineNotFoundException(id));
    }

    @PostMapping()
    Magazine newMagazine(@RequestBody Magazine newMagazine) {
        newMagazine.setDescription("Magazine: " + newMagazine.getTitle());
        return magazineRepository.save(newMagazine);
    }

    @PutMapping("/{id}")
    Magazine replaceMagazine(@RequestBody Magazine newMagazine, @PathVariable Long id) {
        return magazineRepository.findById(id)
                .map(magazine -> {
                    // Update Magazine details
                    magazine.setOrderQty(newMagazine.getOrderQty());
                    magazine.setCurrIssue(newMagazine.getCurrIssue());
                    magazine.setTitle(newMagazine.getTitle());
                    magazine.setCopies(newMagazine.getCopies());
                    magazine.setPrice(newMagazine.getPrice());
                    magazine.setQuantity(newMagazine.getQuantity());
                    magazine.setDescription("Magazine: " + newMagazine.getTitle());

                    // Update associated CartItems
                    List<CartItem> cartItems = cartItemRepository.findByDescription(magazine.getTitle());
                    for (CartItem cartItem : cartItems) {
                        cartItem.setDescription(newMagazine.getTitle());
                        cartItem.setPrice(newMagazine.getPrice());
                        cartItemRepository.save(cartItem);
                    }

                    return magazineRepository.save(magazine);
                })
                .orElseGet(() -> {
                    newMagazine.setId(id);
                    newMagazine.setDescription("Magazine: " + newMagazine.getTitle());
                    return magazineRepository.save(newMagazine);
                });
    }

    @DeleteMapping("/{id}")
    void deleteMagazine(@PathVariable Long id) {
        Magazine magazine = magazineRepository.findById(id)
                .orElseThrow(() -> new MagazineNotFoundException(id));
        List<CartItem> cartItems = cartItemRepository.findByDescription(magazine.getDescription());
        cartItemRepository.deleteAll(cartItems);
        magazineRepository.deleteById(id);

    }
}