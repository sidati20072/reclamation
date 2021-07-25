package mr.municipality.service;

import lombok.extern.slf4j.Slf4j;
import mr.municipality.Model.Enum.DocumentStatus;
import mr.municipality.dao.DocumentRepository;
import mr.municipality.entities.Document;
import mr.municipality.entities.Svc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private SvcService svcService;

    public Document delete(Long id) {
        Document document = documentRepository.getOne(id);
        documentRepository.deleteById(id);
        return document;
    }

    public Document save(Document document) {
        return documentRepository.save(document);
    }

    public List<Document> findAllByBoitierId(Long id) {
        return documentRepository.findAllByBoitierId(id);
    }

    public Document update(Long id, Document document) {
        Document document1 = documentRepository.getOne(id);
        document1.setStatus(document.getStatus());
        document1.setIsBlocked(document.getIsBlocked());
        return documentRepository.save(document1);
    }

    public List<Document> findAll() {
        return documentRepository.findAll();
    }

    public Document move(Long id, Long serviceId) {
        Document document = documentRepository.getOne(id);
        Svc svc = svcService.findById(serviceId);
        document.setServiceActually(svc);
        document.setStatus(DocumentStatus.OUT);
        document.setMouvementDate(LocalDateTime.now());
        return documentRepository.save(document);
    }
}
