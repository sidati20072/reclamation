package mr.municipality.dao;

import mr.municipality.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource
@CrossOrigin(origins = "*")

public interface RoleRepository extends JpaRepository<Role, Long> {

	public Role findByRole(String role);

}
