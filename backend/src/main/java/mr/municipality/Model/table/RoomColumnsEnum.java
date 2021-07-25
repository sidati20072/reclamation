package mr.municipality.Model.table;


import mr.municipality.Model.Enum.AttributeType;
import mr.municipality.Model.Enum.ColumnsEnum;
import mr.municipality.Model.Enum.ColumnsEnumUtils;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;

public enum RoomColumnsEnum implements ColumnsEnum {
    id("id", true, true, true, "", "Id"),
    number("number", true, true, true, AttributeType.STRING, "", "Numéro"),
    note("note", true, true, true, AttributeType.STRING, "", "Note"),
    isActive("isActive", true, true, true, AttributeType.STRING, "", "etat"),
    createdAt("createdAt", true, true, true, AttributeType.DATE, "", "Créé à"),
    updatedAt("updatedAt", true, true, true, AttributeType.DATE, "", "update à");

    private String field;
    private boolean sortable;
    private boolean active;
    private boolean filterable;
    private boolean editable;
    private String type;
    private String cellRenderer;
    private String headerName;


    RoomColumnsEnum(
            String field, boolean sortable, boolean active, boolean filterable, AttributeType type, String cellRenderer, String headerName) {
        this.field = field;
        this.sortable = sortable;
        this.active = active;
        this.filterable = filterable;
        this.editable = false;
        this.type = type.getValue();
        this.cellRenderer = cellRenderer;
        this.headerName = headerName;
    }

    RoomColumnsEnum(String field, boolean sortable, boolean active, boolean filterable, String cellRenderer, String headerName) {
        this(field, sortable, active, filterable, AttributeType.STRING, cellRenderer, headerName);
    }

    public Map<String, Object> asMap(String i18nPrefix) {
        return ColumnsEnumUtils.asMap(i18nPrefix, field, sortable, active, filterable, editable, type, cellRenderer, headerName);
    }

    public static List<Map<String, Object>> allConfigs(String i18nPrefix) {
        List<Map<String, Object>> list = new ArrayList<>();
        for (RoomColumnsEnum element : RoomColumnsEnum.values()) {
            list.add(element.asMap(i18nPrefix));
        }
        return list;
    }

    public static List<Map<String, Object>> configs(
            EnumSet<RoomColumnsEnum> set, String i18nPrefix) {
        List<Map<String, Object>> list = new ArrayList<>();
        for (RoomColumnsEnum element : set) {
            list.add(element.asMap(i18nPrefix));
        }
        return list;
    }
}
