package mr.municipality.service;

import mr.municipality.Model.GenericData;
import mr.municipality.dao.ContractRepository;
import mr.municipality.dao.ReclamationRepository;
import mr.municipality.entities.Contract;
import mr.municipality.entities.Document;
import mr.municipality.entities.Reclamation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ContractService {
    @Autowired
    private ContractRepository repository;
    @Autowired
    StorageService storageService;

    @Value("${uploads}")
    private String path;

    public Contract save(Contract contract) {
        if (contract != null && contract.getId() != null){
            Contract savedContract = repository.getOne(contract.getId());
            contract.setDocuments(savedContract.getDocuments());
        }
        return repository.save(contract);
    }

    public Contract findById(Long contractId) {
        return repository.getOne(contractId);
    }

    public List<Contract> findAll() {
        return repository.findAll();
    }

    public Contract delete(Long id) {
        Contract contract = repository.getOne(id);
        repository.delete(contract);
        return contract;
    }

    public Contract addDocument(Long id , GenericData data) throws IOException {
        Contract contract = repository.getOne(id);
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
            contract.getDocuments().addAll(documents);
        }
        return repository.save(contract);
    }
}
