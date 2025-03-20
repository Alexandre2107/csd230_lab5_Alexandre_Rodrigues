package csd230.lab2.controllers;

import csd230.lab2.entities.Magazine;
import csd230.lab2.repositories.MagazineRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/magazines")
public class MagazineController {

    MagazineRepository magazineRepository;
    public MagazineController(MagazineRepository magazineRepository) {
        this.magazineRepository = magazineRepository;
    }

    @GetMapping
    public String magazines(Model model) {
        model.addAttribute("magazines", magazineRepository.findAll());
        return "magazines";
    }

    @GetMapping("/add-magazine")
    public String magazineForm(Model model) {
        model.addAttribute("magazine", new Magazine());
        return "add-magazine";
    }

    @PostMapping("/add-magazine")
    public String magazineSubmit(@ModelAttribute Magazine magazine, Model model) {
        magazine.setDescription("Magazine: "+magazine.getTitle());
        model.addAttribute("magazine", magazine);
        magazineRepository.save(magazine);
        model.addAttribute("magazines", magazineRepository.findAll());
        return "redirect:/magazines";
    }

    @GetMapping("/edit-magazine")
    public String edit_magazine(@RequestParam(value = "id", required = false) Integer id, Model model) {
        Magazine magazine = magazineRepository.findById(id);
        model.addAttribute("magazine", magazine);
        return "edit-magazine";
    }

    @PostMapping("/edit-magazine")
    public String edit_magazineSubmit(@ModelAttribute Magazine magazine, Model model) {
        magazine.setDescription("Magazine: "+magazine.getTitle());
        magazineRepository.save(magazine);
        return "redirect:/magazines";
    }

    @PostMapping("/selection")
    public String processSelection(@RequestParam("selectedItems") List<Integer> selectedMagazineIds) {
        System.out.println(selectedMagazineIds);
        for (Integer id : selectedMagazineIds) {
            Magazine magazine = magazineRepository.findById(id);
            magazineRepository.delete(magazine);
        }
        return "redirect:/magazines";

    }
}
