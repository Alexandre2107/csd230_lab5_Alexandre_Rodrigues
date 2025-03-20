package csd230.lab2.restControllers.discMagRestControllers;

import csd230.lab2.entities.DiscMag;
import csd230.lab2.repositories.DiscMagRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rest/discMag")
public class DiscMagRestController {
    private final DiscMagRepository discMagRepository;

    public DiscMagRestController(DiscMagRepository discMagRepository) {
        this.discMagRepository = discMagRepository;
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
        return discMagRepository.save(newDiscMag);
    }

    @PutMapping("/{id}")
    DiscMag replaceDiscMag(@RequestBody DiscMag newDiscMag, @PathVariable Long id) {
        return discMagRepository.findById(id)
                .map(discMag -> {
                    discMag.setHasDisc(newDiscMag.getHasDisc());
                    discMag.setTitle(newDiscMag.getTitle());
                    discMag.setDescription(newDiscMag.getDescription());
                    return discMagRepository.save(discMag);
                })
                .orElseGet(() -> {
                    newDiscMag.setId(id);
                    return discMagRepository.save(newDiscMag);
                });
    }

    @DeleteMapping("/{id}")
    void deleteDiscMag(@PathVariable Long id) {
        discMagRepository.deleteById(id);
    }
}