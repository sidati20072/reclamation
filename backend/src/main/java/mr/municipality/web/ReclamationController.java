package mr.municipality.web;

import mr.municipality.Model.GenericData;
import mr.municipality.entities.Reclamation;
import mr.municipality.service.ReclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/reclamations")
public class ReclamationController {

    @Autowired
    private ReclamationService reclamationService;

    @PostMapping
    public Reclamation save(@RequestBody Reclamation reclamation) {
        return reclamationService.save(reclamation);
    }

    @GetMapping
    public List<Reclamation> getReclamations() {
        return reclamationService.findAll();
    }

    @GetMapping("/{id}")
    public Reclamation getReclamationById(@PathVariable("id") Long id) {
        return reclamationService.findById(id);
    }
    @DeleteMapping("/{id}")
    public Reclamation deleteReclamation(@PathVariable("id") Long id) {
        return reclamationService.delete(id);
    }

    @PostMapping("/{id}/documents")
    public Reclamation save(@PathVariable Long id , @ModelAttribute GenericData data) throws IOException {
        return reclamationService.addDocument(id, data);
    }

}
