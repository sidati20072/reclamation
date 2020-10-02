package mr.municipality.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Objects;


@Data
@ToString
@AllArgsConstructor
@Builder
@Entity(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;
    @Column(unique = true)
    private String username;
    private String password;
    private String email;
    private String nom;
    private String prenom;
    private Date createdAt;
    @ManyToMany(fetch = FetchType.EAGER)
    @RestResource(exported = false)
    private Collection<Role> roles = new ArrayList<>();


    public User() {
        this.createdAt = new Date();
    }


    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
