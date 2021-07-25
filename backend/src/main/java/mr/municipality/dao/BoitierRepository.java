package mr.municipality.dao;

import mr.municipality.entities.Boitier;
import mr.municipality.entities.Locker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource
@CrossOrigin(origins = "*")
public interface BoitierRepository extends JpaRepository<Boitier, Long> {

    List<Boitier> findAllByLockerId(Long id);
}

