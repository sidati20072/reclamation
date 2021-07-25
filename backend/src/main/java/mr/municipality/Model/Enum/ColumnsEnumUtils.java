package mr.municipality.Model.Enum;

import java.util.HashMap;
import java.util.Map;

public class ColumnsEnumUtils {
    public static Map<String, Object> asMap(String i18nPrefix, Object... params) {
        int index = i18nPrefix != null ? 0 : 1;

        Map<String, Object> map = new HashMap<>();
        map.put("field", params[0]);
        map.put("header", i18nPrefix != null ? i18nPrefix + params[0] : params[1]);
        map.put("sortable", params[index + 1]);
        map.put("active", params[index + 2]);
        map.put("filterable", params[index + 3]);
        map.put("editable", params[index + 4]);
        map.put("type", params[index + 5]);
        map.put("cellRenderer", params.length > 6 ? params[index + 6] : "");
        map.put("headerName",params[index + 7]);

        return map;
    }
}
