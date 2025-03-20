package csd230.lab2.controllers;


import csd230.lab2.entities.DiscMag;
import csd230.lab2.repositories.DiscMagRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import java.util.List;

@Controller
@RequestMapping("/discMags")
public class DiscMagController {

    private final DiscMagRepository discMagRepository;

    public DiscMagController(DiscMagRepository discMagRepository) {
        this.discMagRepository = discMagRepository;
    }

    @GetMapping
    public String discMags(Model model) {
        model.addAttribute("discMags", discMagRepository.findAll());
        return "discMags";
    }


    @GetMapping("/add-disc-mag")
    public String discMagForm(Model model) {
        model.addAttribute("discMag", new DiscMag());
        return "add-disc-mag";
    }

    @PostMapping("/add-disc-mag")
    public String discMagSubmit(@ModelAttribute DiscMag discMag, Model model) {
        discMag.setDescription("DiscMag: "+ discMag.getTitle());
        model.addAttribute("discMag", discMag);
        discMagRepository.save(discMag);
        model.addAttribute("discMags", discMagRepository.findAll());
        return "redirect:/discMags";
    }

    @GetMapping("/edit-disc-mag")
    public String edit_discMag(@RequestParam(value = "id", required = false) Integer id, Model model) {
        DiscMag discMag = discMagRepository.findById(id);
        model.addAttribute("discMag", discMag);
        return "edit-disc-mag";
    }

    @PostMapping("/edit-disc-mag")
    public String edit_discMagSubmit(@ModelAttribute DiscMag discMag, Model model) {
        discMag.setDescription("DiscMag: "+ discMag.getTitle());
        discMagRepository.save(discMag);
        return "redirect:/discMags";
    }

    @PostMapping("/selection")
    public String processSelection(@RequestParam("selectedItems") List<Integer> selectedDiscMagIds) {
        System.out.println(selectedDiscMagIds);
        for (Integer id : selectedDiscMagIds) {
            DiscMag discMag = discMagRepository.findById(id);
            discMagRepository.delete(discMag);
        }
        return "redirect:/discMags";
    }

}
