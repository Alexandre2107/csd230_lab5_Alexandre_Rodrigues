package csd230.lab2.controllers;

import csd230.lab2.entities.Publication;
import csd230.lab2.repositories.PublicationRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/publications")
public class PublicationController {

    private final PublicationRepository publicationRepository;

    public PublicationController(PublicationRepository publicationRepository) {
        this.publicationRepository = publicationRepository;
    }

    @GetMapping
    public String publications(Model model) {
        model.addAttribute("publications", publicationRepository.findAll());
        return "publications";
    }

    @GetMapping("/add-publication")
    public String publicationForm(Model model) {
        model.addAttribute("publication", new Publication());
        return "add-publication";
    }

    @PostMapping("/add-publication")
    public String publicationSubmit(@ModelAttribute Publication publication, Model model) {
        publication.setDescription("Publication: " + publication.getTitle());
        model.addAttribute("publication", publication);
        publicationRepository.save(publication);
        model.addAttribute("publications", publicationRepository.findAll());
        return "redirect:/publications";
    }

    @GetMapping("/edit-publication")
    public String editPublication(@RequestParam(value = "id", required = false) Long id, Model model) {
        Publication publication = publicationRepository.findById(id).orElse(null);
        model.addAttribute("publication", publication);
        return "edit-publication";
    }

    @PostMapping("/edit-publication")
    public String editPublicationSubmit(@ModelAttribute Publication publication, Model model) {
        publication.setDescription("Publication: " + publication.getTitle());
        publicationRepository.save(publication);
        return "redirect:/publications";
    }

    @PostMapping("/selection")
    public String processSelection(@RequestParam("selectedPublications") List<Long> selectedPublicationIds) {
        for (Long id : selectedPublicationIds) {
            Publication publication = publicationRepository.findById(id).orElse(null);
            if (publication != null) {
                publicationRepository.delete(publication);
            }
        }
        return "redirect:/publications";
    }
}