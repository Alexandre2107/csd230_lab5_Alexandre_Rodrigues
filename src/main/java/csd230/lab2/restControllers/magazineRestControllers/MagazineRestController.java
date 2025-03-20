package csd230.lab2.restControllers.magazineRestControllers;

import csd230.lab2.entities.Magazine;
import csd230.lab2.repositories.MagazineRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rest/magazine")
public class MagazineRestController {
    private final MagazineRepository magazineRepository;

    public MagazineRestController(MagazineRepository magazineRepository) {
        this.magazineRepository = magazineRepository;
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
        return magazineRepository.save(newMagazine);
    }

    @PutMapping("/{id}")
    Magazine replaceMagazine(@RequestBody Magazine newMagazine, @PathVariable Long id) {
        return magazineRepository.findById(id)
                .map(magazine -> {
                    magazine.setOrderQty(newMagazine.getOrderQty());
                    magazine.setCurrIssue(newMagazine.getCurrIssue());
                    magazine.setTitle(newMagazine.getTitle());
                    magazine.setCopies(newMagazine.getCopies());
                    magazine.setPrice(newMagazine.getPrice());
                    magazine.setQuantity(newMagazine.getQuantity());
                    magazine.setDescription(newMagazine.getDescription());
                    return magazineRepository.save(magazine);
                })
                .orElseGet(() -> {
                    newMagazine.setId(id);
                    return magazineRepository.save(newMagazine);
                });
    }

    @DeleteMapping("/{id}")
    void deleteMagazine(@PathVariable Long id) {
        magazineRepository.deleteById(id);
    }
}