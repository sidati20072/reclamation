package mr.municipality.entities;

import lombok.*;
import mr.municipality.Model.Enum.DocumentStatus;
import mr.municipality.Model.Enum.DocumentType;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Data
@ToString
@AllArgsConstructor
@Entity
@Builder
@NoArgsConstructor
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;
    @Enumerated(EnumType.STRING)
    private DocumentType documentType;
    @Enumerated(EnumType.STRING)
    private DocumentStatus status = DocumentStatus.IN;
    private String link;
    private String number;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    private String keyName;
    @ManyToOne
    private Boitier boitier;
    @ManyToOne
    private Svc serviceOrigin;
    @ManyToOne
    private Svc serviceActually;
    private Boolean isBlocked;
    private Integer permis;
    private Integer acte;
    private Integer titreFoncier;
    private Integer quittance;
    private String order;
    private LocalDateTime mouvementDate;
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

