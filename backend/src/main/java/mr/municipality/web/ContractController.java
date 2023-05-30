package mr.municipality.web;

import mr.municipality.Model.GenericData;
import mr.municipality.entities.Contract;
import mr.municipality.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/contract")
public class ContractController {

    @Autowired
    private ContractService service;

    @PostMapping
    public Contract save(@RequestBody Contract reclamation) {
        return service.save(reclamation);
    }

    @GetMapping
    public List<Contract> getContracts() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Contract getContractById(@PathVariable("id") Long id) {
        return service.findById(id);
    }

    @DeleteMapping("/{id}")
    public Contract deleteContract(@PathVariable("id") Long id) {
        return service.delete(id);
    }

    @PostMapping("/{id}/documents")
    public Contract save(@PathVariable Long id, @ModelAttribute GenericData data) throws IOException {
        return service.addDocument(id, data);
    }

}
