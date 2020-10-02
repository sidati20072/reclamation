package mr.municipality;

import mr.municipality.dao.RoleRepository;
import mr.municipality.entities.Document;
import mr.municipality.entities.Role;
import mr.municipality.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class UserServiceApplication implements CommandLineRunner {

    @Autowired
    private RepositoryRestConfiguration repositoryRestConfiguration;
    @Autowired
    private RoleRepository roleRepository;

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        repositoryRestConfiguration.exposeIdsFor(User.class, Document.class, Role.class);

        if (roleRepository.findByRole("USER") == null) {
            Role r = new Role();
            r.setRole("USER");
            roleRepository.save(r);
        }

        if (roleRepository.findByRole("ADMIN") == null) {
            Role r = new Role();
            r.setRole("ADMIN");
            roleRepository.save(r);
        }
    }


}

 
