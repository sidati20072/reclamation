package mr.municipality.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.*;


@Data
@ToString
@AllArgsConstructor
@Builder
@Entity(name = "reclamation")
public class Reclamation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;
    @Column(unique = true)
    private String lot;
    private String etat;
    private Float total;
    private String ncin;
    private String nom;
    private String degrevement;
    private Date createdAt;
    private String date;
    @OneToMany(fetch = FetchType.EAGER , cascade = CascadeType.ALL)
    @RestResource(exported = false)
    private List<Document> Documents = new ArrayList<>();

    public Reclamation() {
        this.createdAt = new Date();
    }


    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
