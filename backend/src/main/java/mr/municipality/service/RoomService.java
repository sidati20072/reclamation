package mr.municipality.service;

import mr.municipality.dao.RoomRepository;
import mr.municipality.entities.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;


    public Room save(Room room) {
        return roomRepository.save(room);
    }

    public Room findById(Long roomId) {
        return roomRepository.getOne(roomId);
    }

    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    public Room delete(Long id) {
        Room room = roomRepository.getOne(id);
        roomRepository.delete(room);
        return room;
    }

}
