package mr.municipality.service;

import mr.municipality.dao.CupboardRepository;
import mr.municipality.entities.Cupboard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CupboardService {
    @Autowired
    private CupboardRepository cupboardRepository;

    @Autowired
    private RoomService roomService;

    public Cupboard save(Cupboard cupboard) {
        cupboard.setRoom(roomService.findById(cupboard.getRoom().getId()));
        return cupboardRepository.save(cupboard);
    }

    public Cupboard findById(Long cupboardId) {
        return cupboardRepository.getOne(cupboardId);
    }

    public List<Cupboard> findAll() {
        return cupboardRepository.findAll();
    }

    public List<Cupboard> findAllByRoomId(Long roomId) {
        return cupboardRepository.findAllByRoomId(roomId);
    }

    public Cupboard delete(Long id) {
        Cupboard cupboard = cupboardRepository.getOne(id);
        cupboardRepository.delete(cupboard);
        return cupboard;
    }

}
