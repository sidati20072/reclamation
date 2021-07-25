package mr.municipality.service;

import mr.municipality.dao.LockerRepository;
import mr.municipality.entities.Locker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class LockerService {
    @Autowired
    private LockerRepository lockerRepository;


    public Locker save(Locker locker) {
        return lockerRepository.save(locker);
    }

    public Locker findById(Long cupboardId) {
        return lockerRepository.getOne(cupboardId);
    }

    public List<Locker> findAll() {
        return lockerRepository.findAll();
    }

    public Locker delete(Long id) {
        Locker locker = lockerRepository.getOne(id);
        lockerRepository.delete(locker);
        return locker;
    }

    public List<Locker> findAllByCupboardId(Long id) {
        return lockerRepository.findAllByCupboardId(id);

    }
}
