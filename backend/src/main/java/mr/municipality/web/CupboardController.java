package mr.municipality.web;

import mr.municipality.entities.Cupboard;
import mr.municipality.service.CupboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/cupboards")
public class CupboardController {

    @Autowired
    private CupboardService cupboardService;

    @PostMapping
    public Cupboard save(@RequestBody Cupboard cupboard) {
        return cupboardService.save(cupboard);
    }

    @GetMapping
    public List<Cupboard> getCupboards() {
        return cupboardService.findAll();
    }

    @GetMapping("/{id}")
    public Cupboard getCupboardById(@PathVariable("id") Long id) {
        return cupboardService.findById(id);
    }

    @GetMapping("/room/{id}")
    public List<Cupboard> getCupboardByRoomId(@PathVariable("id") Long id) {
        return cupboardService.findAllByRoomId(id);
    }

    @DeleteMapping("/{id}")
    public Cupboard deleteCupboard(@PathVariable("id") Long id) {
        return cupboardService.delete(id);
    }


}
