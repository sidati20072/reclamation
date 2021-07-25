package mr.municipality.service;

import lombok.extern.slf4j.Slf4j;
import mr.municipality.dao.DocumentRepository;
import mr.municipality.entities.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    public Document delete(Long id) {
        Document document = documentRepository.getOne(id);
        documentRepository.deleteById(id);
        return document;
    }
}
