package mr.municipality.dao;

import mr.municipality.entities.Room;
import mr.municipality.entities.Svc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource
@CrossOrigin(origins = "*")
public interface SvcRepository extends JpaRepository<Svc, Long> {

}

