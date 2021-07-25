package mr.municipality.dao;

import mr.municipality.entities.Locker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource
@CrossOrigin(origins = "*")
public interface LockerRepository extends JpaRepository<Locker, Long> {

    List<Locker> findAllByCupboardId(Long id);
}

