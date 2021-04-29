package mr.municipality.Model.table;


import mr.municipality.Model.Enum.AttributeType;
import mr.municipality.Model.Enum.ColumnsEnum;
import mr.municipality.Model.Enum.ColumnsEnumUtils;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;

public enum ReclamationColumnsEnum implements ColumnsEnum {
    id("id", true, true, true,"idRenderer"),
    lot("lot", true, true, true,""),
    etat("etat", true, true, true,""),
    total("total", true, true, true,""),
    address("ncin", true, true, true,""),
    nom("nom", true, true, true,""),
    degrevement("degrevement", true, true, true,""),
    document("document", true, true, true,"docRenderer"),
    createdAt("createdAt", true, true, true, AttributeType.DATE,"");

    private String field;
    private boolean sortable;
    private boolean active;
    private boolean filterable;
    private boolean editable;
    private String type;
    private String cellRenderer;


    ReclamationColumnsEnum(
            String field, boolean sortable, boolean active, boolean filterable, AttributeType type, String cellRenderer) {
        this.field = field;
        this.sortable = sortable;
        this.active = active;
        this.filterable = filterable;
        this.editable = false;
        this.type = type.getValue();
        this.cellRenderer = cellRenderer;
    }

    ReclamationColumnsEnum(String field, boolean sortable, boolean active, boolean filterable, String cellRenderer) {
        this(field, sortable, active, filterable, AttributeType.STRING, cellRenderer);
    }

    public Map<String, Object> asMap(String i18nPrefix) {
        return ColumnsEnumUtils.asMap(i18nPrefix, field, sortable, active, filterable, editable, type, cellRenderer);
    }

    public static List<Map<String, Object>> allConfigs(String i18nPrefix) {
        List<Map<String, Object>> list = new ArrayList<>();
        for (ReclamationColumnsEnum element : ReclamationColumnsEnum.values()) {
            list.add(element.asMap(i18nPrefix));
        }
        return list;
    }

    public static List<Map<String, Object>> configs(
            EnumSet<ReclamationColumnsEnum> set, String i18nPrefix) {
        List<Map<String, Object>> list = new ArrayList<>();
        for (ReclamationColumnsEnum element : set) {
            list.add(element.asMap(i18nPrefix));
        }
        return list;
    }
}
