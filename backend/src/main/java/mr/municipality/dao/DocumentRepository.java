package mr.municipality.dao;

import mr.municipality.entities.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource
@CrossOrigin(origins = "*")
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findAllByBoitierId(Long id);
}

