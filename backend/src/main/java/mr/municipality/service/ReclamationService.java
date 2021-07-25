package mr.municipality.service;

import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class ReclamationService {
/*    @Autowired
    private ReclamationRepository reclamationRepository;
    @Autowired
    StorageService storageService;

    @Value("${uploads}")
    private String path;

    public Reclamation save(Reclamation reclamation) {
        return reclamationRepository.save(reclamation);
    }

    public Reclamation findById(Long reclamationId) {
        return reclamationRepository.getOne(reclamationId);
    }

    public List<Reclamation> findAll() {
        return reclamationRepository.findAll();
    }

    public Reclamation delete(Long id) {
        Reclamation reclamation = reclamationRepository.getOne(id);
        reclamationRepository.delete(reclamation);
        return reclamation;
    }

    public Reclamation addDocument(Long id , GenericData data) throws IOException {
        Reclamation reclamation = reclamationRepository.getOne(id);
        List<Document> documents = new ArrayList<>();
        if (data.getDocuments() != null) {
            for (MultipartFile doc : data.getDocuments()
            ) {
                String keyName = storageService.store(doc);
                Document document = Document.builder()
                        .documentType(data.getDocumentType())
                        .keyName(keyName)
                        .link(path + "/" + keyName)
                        .build();
                documents.add(document);
            }
            reclamation.getDocuments().addAll(documents);
        }
        return reclamationRepository.save(reclamation);
    }*/
}
