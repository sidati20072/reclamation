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
//casier
public class Locker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    private String number;
    private String note;
    @ManyToOne
    private Cupboard cupboard;

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}