package mr.municipality.Model.table;


import mr.municipality.Model.Enum.AttributeType;
import mr.municipality.Model.Enum.ColumnsEnum;
import mr.municipality.Model.Enum.ColumnsEnumUtils;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;

public enum DocumentListColumnsEnum implements ColumnsEnum {
    number("number", true, true, true, AttributeType.STRING, "", "Numero"),
    status("status", true, true, true, AttributeType.STRING, "docRenderer", "Status"),
    documentType("documentType", true, true, true, AttributeType.STRING, "", "Type"),
    serviceOrigin("serviceOrigin.name", true, true, true, AttributeType.STRING, "", "Service d'origine"),
    salle("boitier.locker.cupboard.room.number", true, true, true, AttributeType.DATE, "", "Salle"),
    isBlocked("isBlocked", true, true, true, AttributeType.DATE, "blockStatusRenderer", "Etat"),
    armoire("boitier.locker.cupboard.number", true, true, true, AttributeType.DATE, "", "Armoire"),
    casier("boitier.locker.number", true, true, true, AttributeType.DATE, "", "Cassier"),
    boitier("boitier.number", true, true, true, AttributeType.DATE, "", "Boitier");

    private String field;
    private boolean sortable;
    private boolean active;
    private boolean filterable;
    private boolean editable;
    private AttributeType type;
    private String headerName;
    private String cellRenderer;


    DocumentListColumnsEnum(
            String field, boolean sortable, boolean active, boolean filterable, AttributeType type, String cellRenderer, String headerName) {
        this.field = field;
        this.sortable = sortable;
        this.active = active;
        this.filterable = filterable;
        this.editable = false;
        this.type = type;
        this.cellRenderer = cellRenderer;
        this.headerName = headerName;
    }

    DocumentListColumnsEnum(String field, boolean sortable, boolean active, boolean filterable, String cellRenderer, String headerName) {
        this(field, sortable, active, filterable, AttributeType.STRING, cellRenderer, headerName);
    }

    public Map<String, Object> asMap(String i18nPrefix) {
        return ColumnsEnumUtils.asMap(i18nPrefix, field, sortable, active, filterable, editable, type, cellRenderer, headerName);
    }

    public static List<Map<String, Object>> allConfigs(String i18nPrefix) {
        List<Map<String, Object>> list = new ArrayList<>();
        for (DocumentListColumnsEnum element : DocumentListColumnsEnum.values()) {
            list.add(element.asMap(i18nPrefix));
        }
        return list;
    }

    public static List<Map<String, Object>> configs(
            EnumSet<DocumentListColumnsEnum> set, String i18nPrefix) {
        List<Map<String, Object>> list = new ArrayList<>();
        for (DocumentListColumnsEnum element : set) {
            list.add(element.asMap(i18nPrefix));
        }
        return list;
    }
}
