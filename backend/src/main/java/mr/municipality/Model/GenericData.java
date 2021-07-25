package mr.municipality.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import mr.municipality.Model.Enum.DocumentType;
import mr.municipality.entities.Svc;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.ManyToOne;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class GenericData {
    private MultipartFile document;
    private Long lockerId;
    private Long serviceOriginId;
    private Svc serviceActually;
    private Boolean isBlocked;
    private Integer permis;
    private Integer acte;
    private Integer titreFoncier;
    private Integer quittance;
    private String number;
    private String order;

}
