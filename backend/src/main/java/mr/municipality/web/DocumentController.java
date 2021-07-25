package mr.municipality.web;

import lombok.*;
import lombok.extern.slf4j.Slf4j;
import mr.municipality.Model.Enum.DocumentStatus;
import mr.municipality.Model.GenericData;
import mr.municipality.entities.Boitier;
import mr.municipality.entities.Document;
import mr.municipality.service.BoitierService;
import mr.municipality.service.DocumentService;
import mr.municipality.service.StorageService;
import mr.municipality.service.SvcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/documents")
@Slf4j
public class DocumentController {
    @Autowired
    private StorageService storageService;
    @Autowired
    private DocumentService documentService;
    @Autowired
    private BoitierService boitierService;
    @Autowired
    private SvcService svcService;

    @Value("${uploads}")
    private String path;

    @PostMapping("/upload/{id}")
    public Document addDocument(@PathVariable Long id, @ModelAttribute GenericData data) throws IOException {
        Boitier boitier = boitierService.findById(id);
        String keyName = storageService.store(data.getDocument());
        Document document = Document.builder()
                .keyName(keyName)
                .link(path + "/" + keyName)
                .boitier(boitier)
                .status(DocumentStatus.IN)
                .acte(data.getActe())
                .permis(data.getPermis())
                .titreFoncier(data.getTitreFoncier())
                .quittance(data.getQuittance())
                .isBlocked(false)
                .number(data.getNumber())
                .order(data.getOrder())
                .serviceOrigin(svcService.findById(data.getServiceOriginId()))
                .build();
        return documentService.save(document);
    }


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

    @PatchMapping("/{id}")
    public Document patchDoc(@PathVariable Long id, @RequestBody Document document) {
        return documentService.update(id, document);
    }

    @PostMapping("/move")
    public Document move(@RequestBody MoveData moveData) {
        return documentService.move(moveData.getId(), moveData.getServiceId());
    }

    @GetMapping("/boitier/{id}")
    public List<Document> findAllByBoitier(@PathVariable Long id) {
        return documentService.findAllByBoitierId(id);
    }

    @GetMapping
    public List<Document> findAll() {
        return documentService.findAll();
    }


    @Builder
    @Data
    @ToString
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DocumentResult {
        private String docSrc;

    }

    @Builder
    @Data
    @ToString
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MoveData {
        private Long id;
        private Long serviceId;

    }


}
