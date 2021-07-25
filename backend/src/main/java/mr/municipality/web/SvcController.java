package mr.municipality.web;

import mr.municipality.entities.Svc;
import mr.municipality.service.SvcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/svc")
public class SvcController {

    @Autowired
    private SvcService service;

    @PostMapping
    public Svc save(@RequestBody Svc svc) {
        return service.save(svc);
    }

    @GetMapping
    public List<Svc> getALl() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Svc getById(@PathVariable("id") Long id) {
        return service.findById(id);
    }

    @DeleteMapping("/{id}")
    public Svc deleteLocker(@PathVariable("id") Long id) {
        return service.delete(id);
    }

}
