package mr.municipality.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import mr.municipality.Model.Enum.DocumentType;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@Builder
public class GenericData {
    private MultipartFile[] documents;
    private DocumentType documentType;
    private Long ReclamationId;

    public GenericData() {
    }
}
