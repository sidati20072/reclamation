package mr.municipality.Model.Enum;

public enum DocumentType {
    PO("PO"),
    TF("TF");

    private String name = "";

    //Constructeur
    DocumentType(String name) {
        this.name = name;
    }


    public String toString() {
        return name;
    }
}
