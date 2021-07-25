package mr.municipality.web;

import mr.municipality.entities.Room;
import mr.municipality.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping
    public Room save(@RequestBody Room room) {
        return roomService.save(room);
    }

    @GetMapping
    public List<Room> getRooms() {
        return roomService.findAll();
    }

    @GetMapping("/{id}")
    public Room getRoomById(@PathVariable("id") Long id) {
        return roomService.findById(id);
    }

    @DeleteMapping("/{id}")
    public Room deleteRoom(@PathVariable("id") Long id) {
        return roomService.delete(id);
    }


}
