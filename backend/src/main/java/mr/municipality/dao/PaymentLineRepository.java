package mr.municipality.dao;

import mr.municipality.entities.PaymentLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface PaymentLineRepository extends JpaRepository<PaymentLine, Long> {

    @Query("select sum(p.amount) from PaymentLine p where p.reclamation.id =?1")
    Float sumTotalPaid(Long id);

    List<PaymentLine> findAllByReclamationId(Long id);
}

