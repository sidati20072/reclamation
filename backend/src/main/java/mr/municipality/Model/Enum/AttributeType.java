package mr.municipality.Model.Enum;

public enum AttributeType {
    STRING("String"),
    NUMERIC("Numeric"),
    BOOLEAN("Boolean"),
    DATE("Date"),
    LIST("List");

    String value;

    AttributeType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
