package mr.municipality.service;

import mr.municipality.Model.RegistrationForm;
import mr.municipality.dao.RoleRepository;
import mr.municipality.dao.UserRepository;
import mr.municipality.entities.Role;
import mr.municipality.entities.User;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class AccountServiceImpl {

    @Autowired
    private BCryptPasswordEncoder bcrypt;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;


    public User saveUser(RegistrationForm data) {

        User u = new User();
        u.setEmail(data.getEmail());
        u.setUsername(data.getUsername());
        u.setNom(data.getNom());
        u.setPrenom(data.getPrenom());
        u.setPassword(bcrypt.encode(data.getPassword()));
        userRepository.save(u);

        this.addRoleToUser(u.getUsername(), data.getRole());

        return u;
    }

    public Role saveRole(Role r) {

        return roleRepository.save(r);
    }

    public User findUserByUsername(String username) {

        return userRepository.findByUsername(username);
    }

    public User findUserByEmail(String email) {

        return userRepository.findByEmail(email);
    }


    public void addRoleToUser(String username, String roleName) {

        User user = userRepository.findTopByUsername(username);
        Role role = roleRepository.findByRole(roleName);
        user.getRoles().add(role);

    }


    public User changePassword(String email, String password, String newPassword) {

        User user = userRepository.findByEmail(email);
        if (user == null) throw new RuntimeException("email ou mots de passe incorrect ");

        if (bcrypt.matches(password, user.getPassword())) {
            user.setPassword(bcrypt.encode(newPassword));
        } else throw new RuntimeException("mots de passe incorrect!");

        return user;
    }

    private String passwordGenerator() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?";
        String pwd = RandomStringUtils.random(15, characters);
        return pwd;
    }


    public String encode(String pwd) {
        return bcrypt.encode(pwd);
    }
}
