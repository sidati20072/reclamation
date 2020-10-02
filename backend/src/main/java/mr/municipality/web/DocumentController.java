package mr.municipality.web;

import lombok.*;
import lombok.extern.slf4j.Slf4j;
import mr.municipality.entities.Document;
import mr.municipality.service.DocumentService;
import mr.municipality.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/documents")
@Slf4j
public class DocumentController {
    @Autowired
    private StorageService storageService;
    @Autowired
    private DocumentService documentService;


    @GetMapping("/downloadDoc/{keyname}")
    public ResponseEntity<Resource> downloadFileByFilePath(@PathVariable String keyname, HttpServletRequest request) {
        try {
            // Load file as Resource
            Resource resource = storageService.loadFile(keyname);
            // Try to determine file's content type
            String content = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(content != null ? content : "application/octet-stream"))
                    .body(resource);
        } catch (IOException ex) {
            log.info("Could not determine file type.", ex);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/downloadRessource/{id}")
    public ResponseEntity<DocumentResult> downloadFileByFilePath(@PathVariable Long id, HttpServletRequest request) throws IOException {
        return ResponseEntity.ok().body(
                DocumentResult.builder()
                        .docSrc(storageService.downloadDocument(id))
                        .build());
    }

    @DeleteMapping("/{id}")
    public Document deleteDoc(@PathVariable Long id) {
        return documentService.delete(id);
    }


    @Builder
    @Data
    @ToString
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DocumentResult {
        private String docSrc;

    }
}
