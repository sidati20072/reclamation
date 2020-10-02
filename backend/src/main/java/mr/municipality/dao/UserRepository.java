package mr.municipality.dao;

import mr.municipality.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource
@CrossOrigin(origins = "*")
public interface UserRepository extends JpaRepository<User, Long> {
    public User findByUsername(String username);

    public User findTopByUsername(String username);

    public User findByEmail(String email);

    public List<User> findUsersByRoles_Role(String role);

}

