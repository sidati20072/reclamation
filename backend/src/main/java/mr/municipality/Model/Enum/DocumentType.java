package mr.municipality.Model.Enum;

public enum DocumentType {
    AVIS("AVIS"),
    FEUILLE("FEUILLE"),
    DEMANDE("DEMANDE"),
    FICHE("FICHE"),
    CONTRACT("CONTRACT"),
    AUTRE("AUTRE");

    private String name = "";

    //Constructeur
    DocumentType(String name) {
        this.name = name;
    }


    public String toString() {
        return name;
    }
}
