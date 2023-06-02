package mr.municipality.Model.table;


import mr.municipality.Model.Enum.AttributeType;
import mr.municipality.Model.Enum.ColumnsEnum;
import mr.municipality.Model.Enum.ColumnsEnumUtils;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;

public enum ContractColumnsEnum implements ColumnsEnum {
    id("id", true, true, true, "idRenderer"),
    raisonSociale("raisonSociale", true, true, true, ""),
    Nom("nom", true, true, true, ""),
    payment("payment", true, true, true, ""),
    address("address", true, true, true, AttributeType.DATE,""),
    date("date", true, true, true, ""),
    loyer("loyer", true, true, true, ""),
    PeriodePaiement("paymentDuration", true, true, true, ""),
    DernierPaiement("lastPayment", true, true, true, ""),
    document("document", true, true, true, "docRenderer"),
    createdAt("createdAt", true, true, true, AttributeType.DATE, "");
    private String field;
    private boolean sortable;
    private boolean active;
    private boolean filterable;
    private boolean editable;
    private String type;
    private String cellRenderer;


    ContractColumnsEnum(
            String field, boolean sortable, boolean active, boolean filterable, AttributeType type, String cellRenderer) {
        this.field = field;
        this.sortable = sortable;
        this.active = active;
        this.filterable = filterable;
        this.editable = false;
        this.type = type.getValue();
        this.cellRenderer = cellRenderer;
    }

    ContractColumnsEnum(String field, boolean sortable, boolean active, boolean filterable, String cellRenderer) {
        this(field, sortable, active, filterable, AttributeType.STRING, cellRenderer);
    }

    public Map<String, Object> asMap(String i18nPrefix) {
        return ColumnsEnumUtils.asMap(i18nPrefix, field, sortable, active, filterable, editable, type, cellRenderer);
    }

    public static List<Map<String, Object>> allConfigs(String i18nPrefix) {
        List<Map<String, Object>> list = new ArrayList<>();
        for (ContractColumnsEnum element : ContractColumnsEnum.values()) {
            list.add(element.asMap(i18nPrefix));
        }
        return list;
    }

    public static List<Map<String, Object>> configs(
            EnumSet<ContractColumnsEnum> set, String i18nPrefix) {
        List<Map<String, Object>> list = new ArrayList<>();
        for (ContractColumnsEnum element : set) {
            list.add(element.asMap(i18nPrefix));
        }
        return list;
    }
}
