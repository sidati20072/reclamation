package mr.municipality.Model.Enum;

public enum DocumentStatus {
    IN("IN"),
    OUT("OUT");

    private String name = "";

    //Constructeur
    DocumentStatus(String name) {
        this.name = name;
    }


    public String toString() {
        return name;
    }
}
