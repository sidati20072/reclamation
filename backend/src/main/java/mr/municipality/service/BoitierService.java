package mr.municipality.service;

import mr.municipality.dao.BoitierRepository;
import mr.municipality.entities.Boitier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class BoitierService {
    @Autowired
    private BoitierRepository boitierRepository;


    public Boitier save(Boitier boitier) {
        return boitierRepository.save(boitier);
    }

    public Boitier findById(Long boitierId) {
        return boitierRepository.getOne(boitierId);
    }

    public List<Boitier> findAll() {
        return boitierRepository.findAll();
    }

    public Boitier delete(Long id) {
        Boitier boitier = boitierRepository.getOne(id);
        boitierRepository.delete(boitier);
        return boitier;
    }

    public List<Boitier> findAllByLockerId(Long id) {
        return boitierRepository.findAllByLockerId(id);

    }
}
