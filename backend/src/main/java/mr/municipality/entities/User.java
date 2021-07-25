package mr.municipality.entities;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Objects;


@Data
@ToString
@AllArgsConstructor
@Builder
@NoArgsConstructor
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
    @CreationTimestamp
    private LocalDateTime createdAt;
    @CreationTimestamp
    private LocalDateTime updatedAt;
    @ManyToMany(fetch = FetchType.EAGER)
    @RestResource(exported = false)
    private Collection<Role> roles = new ArrayList<>();


    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
