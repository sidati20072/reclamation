package mr.municipality.web;

import org.springframework.web.bind.annotation.*;
import mr.municipality.Model.table.DataTableColumnEnum;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ui/config/")
@CrossOrigin(origins = "*")

public class UIController {


    @GetMapping("/datatable/{tableName}")
    public List<Map<String, Object>> tableConfig(@PathVariable String tableName) {
        for (DataTableColumnEnum v : DataTableColumnEnum.values()) {
            if (v.getValue().equals(tableName)) {
                return v.getColumnsList();
            }
        }
        return Collections.EMPTY_LIST;
    }


}
