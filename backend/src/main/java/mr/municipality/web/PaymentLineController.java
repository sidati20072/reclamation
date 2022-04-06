package mr.municipality.web;

import mr.municipality.entities.PaymentLine;
import mr.municipality.service.PaymentLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/paymentLine")
public class PaymentLineController {

    @Autowired
    private PaymentLineService paymentLineService;

    @PostMapping("/{id}")
    public PaymentLine save(@PathVariable Long id, @RequestBody PaymentLine paymentLine) {
        return paymentLineService.save(id, paymentLine);
    }

    @GetMapping
    public List<PaymentLine> getPaymentLines() {
        return paymentLineService.findAll();
    }

   @GetMapping("/reclamation/{id}")
    public List<PaymentLine> getPaymentLinesByReclamation(@PathVariable Long id) {
        return paymentLineService.findAllByReclamation(id);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        paymentLineService.delete(id);
    }
}
