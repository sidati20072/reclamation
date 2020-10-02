package mr.municipality.Model.Enum;

public enum OrderEnum {
    ACCEPTED("accepted"),
    REFUSED("refused"),
    WAITING ("waiting"),
    FINISHED ("finished"),
    REVIEWED ("reviewed"),
    DELIVERED ("delivered"),
    CANCELED ("canceled");

    private String name = "";

    //Constructeur
    OrderEnum(String name){
        this.name = name;
    }

    public String toString(){
        return name;
    }
}

