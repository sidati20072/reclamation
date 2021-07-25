package mr.municipality.entities;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;


@Data
@ToString
@AllArgsConstructor
@Builder
@Entity
@NoArgsConstructor
public class Svc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    private String name;
    private String note;
    private Boolean isArchived;

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
