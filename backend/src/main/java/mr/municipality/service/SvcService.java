package mr.municipality.service;

import mr.municipality.dao.SvcRepository;
import mr.municipality.entities.Svc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class SvcService {
    @Autowired
    private SvcRepository repository;


    public Svc save(Svc svc) {
        return repository.save(svc);
    }

    public Svc findById(Long svcId) {
        return repository.getOne(svcId);
    }

    public List<Svc> findAll() {
        return repository.findAll();
    }

    public Svc delete(Long id) {
        Svc boitier = repository.getOne(id);
        repository.delete(boitier);
        return boitier;
    }


}
