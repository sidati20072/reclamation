package mr.municipality.Model.table;


import mr.municipality.Model.Enum.AttributeType;
import mr.municipality.Model.Enum.ColumnsEnum;
import mr.municipality.Model.Enum.ColumnsEnumUtils;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;

public enum DocumentColumnsEnum implements ColumnsEnum {
    number("number", true, true, true, AttributeType.STRING, "","Numéro"),
    status("status", true, true, true, AttributeType.STRING, "docRenderer","Status"),
    serviceOrigin("serviceOrigin.name", true, true, true, AttributeType.STRING, "","Service d'origine"),
    permis("permis", true, true, true, AttributeType.STRING, "","Permis"),
    quittance("quittance", true, true, true, AttributeType.STRING, "","Quittance"),
    acte("acte", true, true, true, AttributeType.STRING, "","Acte"),
    titreFoncier("titreFoncier", true, true, true, AttributeType.STRING, "","Titre foncier"),
    isBlocked("isBlocked", true, true, true, AttributeType.DATE, "blockStatusRenderer","Etat"),
    order("order", true, true, true, AttributeType.DATE, "","Order"),
    createdAt("createdAt", true, true, true, AttributeType.DATE, "", "Créé le") ;

    private String field;
    private boolean sortable;
    private boolean active;
    private boolean filterable;
    private boolean editable;
    private String type;
    private String headerName;
    private String cellRenderer;


    DocumentColumnsEnum(
            String field, boolean sortable, boolean active, boolean filterable, AttributeType type, String cellRenderer, String headerName) {
        this.field = field;
        this.sortable = sortable;
        this.active = active;
        this.filterable = filterable;
        this.editable = false;
        this.type = type.getValue();
        this.headerName = headerName;
        this.cellRenderer = cellRenderer;
    }

    DocumentColumnsEnum(String field, boolean sortable, boolean active, boolean filterable, String cellRenderer, String headerName) {
        this(field, sortable, active, filterable, AttributeType.STRING, cellRenderer, headerName);
    }

    public Map<String, Object> asMap(String i18nPrefix) {
        return ColumnsEnumUtils.asMap(i18nPrefix, field, sortable, active, filterable, editable, type, cellRenderer, headerName);
    }

    public static List<Map<String, Object>> allConfigs(String i18nPrefix) {
        List<Map<String, Object>> list = new ArrayList<>();
        for (DocumentColumnsEnum element : DocumentColumnsEnum.values()) {
            list.add(element.asMap(i18nPrefix));
        }
        return list;
    }

    public static List<Map<String, Object>> configs(
            EnumSet<DocumentColumnsEnum> set, String i18nPrefix) {
        List<Map<String, Object>> list = new ArrayList<>();
        for (DocumentColumnsEnum element : set) {
            list.add(element.asMap(i18nPrefix));
        }
        return list;
    }
}
