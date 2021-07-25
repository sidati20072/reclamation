package mr.municipality.web;

import mr.municipality.entities.Boitier;
import mr.municipality.service.BoitierService;
import mr.municipality.service.LockerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/boitiers")
public class BoitierController {

    @Autowired
    private LockerService lockerService;
    @Autowired
    private BoitierService boitierService;

    @PostMapping
    public Boitier save(@RequestBody Boitier boitier) {
        boitier.setLocker(lockerService.findById(boitier.getLocker().getId()));
        return boitierService.save(boitier);
    }

    @GetMapping
    public List<Boitier> getALl() {
        return boitierService.findAll();
    }

    @GetMapping("/{id}")
    public Boitier getById(@PathVariable("id") Long id) {
        return boitierService.findById(id);
    }

    @DeleteMapping("/{id}")
    public Boitier deleteLocker(@PathVariable("id") Long id) {
        return boitierService.delete(id);
    }

    @GetMapping("/locker/{id}")
    public List<Boitier> getLockerByCupboardId(@PathVariable("id") Long id) {
        return boitierService.findAllByLockerId(id);
    }

}
