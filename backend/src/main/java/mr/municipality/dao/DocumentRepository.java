package mr.municipality.dao;

import mr.municipality.entities.Document;
import mr.municipality.entities.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource
@CrossOrigin(origins = "*")
public interface DocumentRepository extends JpaRepository<Document, Long> {

}

