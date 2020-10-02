package mr.municipality.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import mr.municipality.Model.Enum.DocumentType;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Data
@ToString
@AllArgsConstructor
@Entity
@Builder
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;
    private DocumentType documentType;
    private String link;
    private Date createdAt;
    private String keyName;

    public Document() {
        this.createdAt = new Date();
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

