package mr.municipality.entities;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;


@Data
@ToString
@AllArgsConstructor
@Builder
@Entity(name = "contract")
@NoArgsConstructor
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;
    private String nom;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    private String address;
    private String loyer;
    private String date;
    private String payment;
    private String lastPayment;
    private String paymentDuration;
    private String raisonSociale;
    @OneToMany(fetch = FetchType.EAGER , cascade = CascadeType.ALL)
    @RestResource(exported = false)
    private List<Document> Documents = new ArrayList<>();



    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
