package mr.municipality.web;

import mr.municipality.Model.RegistrationForm;
import mr.municipality.dao.UserRepository;
import mr.municipality.entities.User;
import mr.municipality.service.AccountServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private AccountServiceImpl accountService;
    @Autowired
    private UserRepository userRepository;


    @PostMapping("/signup")
    public User signUp(@RequestBody RegistrationForm data) {
        User user = userRepository.findByUsername(data.getUsername());
        if (user != null) throw new RuntimeException("This user already exist");
        return accountService.saveUser(data);
    }


    @GetMapping("/autoCreate")
    public User autoCreate() {
        RegistrationForm data = RegistrationForm.builder()
                .username("admin")
                .email("admin@gmail.com")
                .role("ADMIN")
                .password("admin")
                .build();
        User user = userRepository.findByUsername(data.getUsername());
        if (user != null) throw new RuntimeException("This user already exist");
        return accountService.saveUser(data);
    }


    @GetMapping("/users/all")
    public List<User> UserFilter() {
        return userRepository.findAll().stream().sorted(Comparator.comparingLong(User::getId).reversed())
                .collect(Collectors.toList());
    }

    @GetMapping("/users/{username}")
    public User UserFilter(@PathVariable String username) {
        return userRepository.findByUsername(username);
    }

}
