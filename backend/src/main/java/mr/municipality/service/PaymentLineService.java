package mr.municipality.service;

import mr.municipality.dao.PaymentLineRepository;
import mr.municipality.dao.ReclamationRepository;
import mr.municipality.entities.PaymentLine;
import mr.municipality.entities.Reclamation;
import mr.municipality.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PaymentLineService {
    @Autowired
    private PaymentLineRepository paymentLineRepository;
    @Autowired
    private ReclamationRepository reclamationRepository;

    public PaymentLine save(Long reclamationId, PaymentLine paymentLine) {
        Reclamation reclamation = reclamationRepository.findById(reclamationId).orElseThrow(NotFoundException::new);
        paymentLine.setReclamation(reclamation);
        paymentLineRepository.save(paymentLine);
        updateReclamation(paymentLine);
        return paymentLine;
    }

    public List<PaymentLine> findAll() {
        return paymentLineRepository.findAll();
    }

    public void delete(Long id) {
        PaymentLine paymentLine = paymentLineRepository.findById(id).orElseThrow(NotFoundException::new);
        paymentLineRepository.deleteById(id);
        updateReclamation(paymentLine);
    }


    private void updateReclamation(PaymentLine paymentLine) {
        Reclamation reclamation = reclamationRepository.findById(paymentLine.getReclamation().getId()).orElseThrow(NotFoundException::new);
        Float totalPaid = paymentLineRepository.sumTotalPaid(reclamation.getId());
        reclamation.setPaid(totalPaid);
        reclamationRepository.save(reclamation);
    }

    public List<PaymentLine> findAllByReclamation(Long id) {
        return paymentLineRepository.findAllByReclamationId(id);
    }
}
