package csd230.lab2.restControllers.publicationRestControllers;

import csd230.lab2.entities.Publication;
import csd230.lab2.repositories.PublicationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rest/publication")
public class PublicationRestController {
    private final PublicationRepository publicationRepository;

    public PublicationRestController(PublicationRepository publicationRepository) {
        this.publicationRepository = publicationRepository;
    }

    @GetMapping()
    List<Publication> all() {
        return publicationRepository.findAll();
    }

    @GetMapping("/{id}")
    public Publication getPublication(@PathVariable Long id) {
        return publicationRepository.findById(id)
                .orElseThrow(() -> new PublicationNotFoundException(id));
    }

    @PostMapping()
    Publication newPublication(@RequestBody Publication newPublication) {
        return publicationRepository.save(newPublication);
    }

    @PutMapping("/{id}")
    Publication replacePublication(@RequestBody Publication newPublication, @PathVariable Long id) {
        return publicationRepository.findById(id)
                .map(publication -> {
                    publication.setPrice(newPublication.getPrice());
                    publication.setQuantity(newPublication.getQuantity());
                    publication.setDescription(newPublication.getDescription());
                    publication.setTitle(newPublication.getTitle());
                    publication.setCopies(newPublication.getCopies());
                    return publicationRepository.save(publication);
                })
                .orElseGet(() -> {
                    newPublication.setId(id);
                    return publicationRepository.save(newPublication);
                });
    }

    @DeleteMapping("/{id}")
    void deletePublication(@PathVariable Long id) {
        publicationRepository.deleteById(id);
    }
}