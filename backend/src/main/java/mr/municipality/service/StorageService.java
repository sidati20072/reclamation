package mr.municipality.service;

import com.amazonaws.util.IOUtils;
import lombok.extern.slf4j.Slf4j;
import mr.municipality.dao.DocumentRepository;
import mr.municipality.entities.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
@Slf4j
public class StorageService {

    @Autowired
    private DocumentRepository documentRepository;

    @Value("${uploads}")
    private String path;

    public String store(MultipartFile file) throws IOException {
        Path rootLocation = Paths.get(path);
        final String randomString = UUID.randomUUID().toString().replace("-", "");
        String filenameString = randomString.concat("_").concat(file.getOriginalFilename());
        Path filename = rootLocation.resolve(filenameString);
        Files.copy(file.getInputStream(), filename);
        return filenameString;
    }

    public Resource loadFile(String filename) throws MalformedURLException {

        Path rootLocation = Paths.get(path);
        Path file = rootLocation.resolve(filename);
        Resource resource = new UrlResource(file.toUri());
        if (resource.exists() || resource.isReadable()) {
            return resource;
        }
        return null;
    }

    public boolean deleteFile(String filename) {
        boolean deleted = false;
        Path rootLocation = Paths.get(path);
        Path fileToDelete = rootLocation.resolve(filename);
        try {
            deleted = Files.deleteIfExists(fileToDelete);
        } catch (IOException e) {
            log.error(e.getMessage());
        }
        return deleted;
    }


    public String downloadDocument(Long documentId) throws MalformedURLException, IOException {
        String resorceBase64 = "";
        if (documentRepository.findById(documentId).isPresent()) {
            Document document = documentRepository.findById(documentId).get();
            // Load file as Resource
            Resource resource = loadFile(document.getKeyName());
            // Try to determine file's content type
            resorceBase64 = Base64.getEncoder().encodeToString(IOUtils.toByteArray(resource.getInputStream()));
        }
        return resorceBase64;
    }

    @PostConstruct
    public void init() throws IOException {
        Path rootLocation = Paths.get(path);
        if (!Files.exists(rootLocation)) {
            Files.createDirectories(rootLocation);
        }
    }
}
