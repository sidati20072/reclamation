package mr.municipality.dao;

import mr.municipality.entities.Cupboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource
@CrossOrigin(origins = "*")
public interface CupboardRepository extends JpaRepository<Cupboard, Long> {

    List<Cupboard> findAllByRoomId(Long roomId);
}

