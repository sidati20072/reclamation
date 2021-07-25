package mr.municipality.web;

import mr.municipality.entities.Locker;
import mr.municipality.service.CupboardService;
import mr.municipality.service.LockerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/lockers")
public class LockerController {

    @Autowired
    private LockerService lockerService;
    @Autowired
    private CupboardService cupboardService;

    @PostMapping
    public Locker save(@RequestBody Locker locker) {
        locker.setCupboard(cupboardService.findById(locker.getCupboard().getId()));
        return lockerService.save(locker);
    }

    @GetMapping
    public List<Locker> getLockers() {
        return lockerService.findAll();
    }

    @GetMapping("/{id}")
    public Locker getLockerById(@PathVariable("id") Long id) {
        return lockerService.findById(id);
    }

    @DeleteMapping("/{id}")
    public Locker deleteLocker(@PathVariable("id") Long id) {
        return lockerService.delete(id);
    }

    @GetMapping("/cupboard/{id}")
    public List<Locker> getLockerByCupboardId(@PathVariable("id") Long id) {
        return lockerService.findAllByCupboardId(id);
    }

}
