package mr.municipality.Model.Enum;

public enum DocumentType {
    AVIS("AVIS"),
    COMMANDE("COMMANDE"),
    DEMANDE("DEMANDE"),
    FICHE("FICHE"),
    AUTRE("AUTRE"),
    ;

    private String name = "";

    //Constructeur
    DocumentType(String name) {
        this.name = name;
    }


    public String toString() {
        return name;
    }
}
